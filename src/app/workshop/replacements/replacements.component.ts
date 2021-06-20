import { Component, OnInit } from '@angular/core';
import {ReplacementUsed} from '../shared/services/models/replacement-used';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSelectChange} from '@angular/material/select';
import {ReplacementsService} from './replacements-service';
import {Replacement} from '../shared/services/models/replacement';
import {SharedReplacementService} from '../shared/services/shared.replacement.service';
import {Revision} from '../shared/services/models/revision';
import {RevisionService} from '../revisions/revision.service';


@Component({
  selector: 'app-replacements',
  templateUrl: './replacements.component.html',
  styleUrls: ['./replacements.component.css']
})
export class ReplacementsComponent {
  replacementsUsed: ReplacementUsed[];
  replacementUsedForm: FormGroup;
  titleForm = 'Añadir repuesto';
  replacements: ReplacementUsed[];
  replacementModel: ReplacementUsed;
  showForm = false;
  displayedColumns: string[] = ['quantity', 'replacement.name', 'own', 'price', 'actions'];
  dataSource: MatTableDataSource<ReplacementUsed>;
  nameReplacementSelectForm = '';
  replacementsOptions: Replacement[];
  totalCost: string;

  constructor(private snackBar: MatSnackBar, private replacementsService: ReplacementsService,
              private sharedReplacementService: SharedReplacementService, private revisionService: RevisionService) {
    this.replacementModel =  {
      reference: '',
      quantity: null,
      own: false,
      replacement: {
        reference: '',
        name: null
      },
      price: null
    };

    this.replacementUsedForm = templateForm(this.replacementModel);

    this.replacementsUsed = this.replacementsService.getDataFromTable();
    this.refreshTable();

    this.sharedReplacementService.search({active: true})
      .subscribe(replacementsOptions => this.replacementsOptions = replacementsOptions);
  }


  toggleFormReplacement(): void {
    this.showForm = !this.showForm;
  }

  hasError(name: string, errorName: string): boolean {
    return this.replacementUsedForm.controls[name].hasError(errorName);
  }

  createReplacement(): void {
    this.titleForm = 'Añadir Repuesto';
    this.toggleFormReplacement();
    const replacementUsed = {
      referenceId: '',
      quantity: null,
      own: false,
      replacement: {
        referenceId: '',
        name: null
      },
      price: null,

    };

    this.replacementUsedForm = templateForm(replacementUsed);
  }

  updateReplacement(replacementUsed: ReplacementUsed): void {
    this.titleForm = 'Editar Repuesto';
    this.toggleFormReplacement();
    this.replacementUsedForm = templateForm(replacementUsed);
  }

  deleteReplacement(replacemementUsed: ReplacementUsed): void {
    console.log(replacemementUsed);
    const indexItem = this.replacementsUsed.findIndex(repItem => repItem.replacement.reference === replacemementUsed.replacement.reference);
    this.replacementsUsed.splice(indexItem, 1);

    this.replacementsService.updateDataFromTable(this.replacementsUsed);
    this.refreshTable();
  }

  onSubmit(replacementUsedForm: FormGroup): void {
    if (!replacementUsedForm.valid) {
      this.snackBar.open('Hay datos inválidos en el formulario', 'Error', {
        duration: 2000
      });
      return;
    }

    const replacementUsed = this.serializeForm(replacementUsedForm.value);
    this.saveReplacement(replacementUsed);

    this.toggleFormReplacement();
  }

  saveReplacement(replacementUsed: ReplacementUsed): void {
    if (hasReference(replacementUsed)){
      this.update(replacementUsed);
    }else{
      if ( hasRevision(replacementUsed) ) {
        this.create(replacementUsed);
      }else{
        this.addToTable(replacementUsed);
      }
    }
  }

  update(replacementUsed: ReplacementUsed): void {
    this.replacementsService.update(replacementUsed)
      .subscribe(() => this.replacementsService.search(replacementUsed)
        .subscribe(replacementsUsed => {
          this.setTableAndRefresh(replacementsUsed);
        })
      );
  }

  create(replacementUsed: ReplacementUsed): void {
    this.replacementsService.create(replacementUsed)
      .subscribe(() => this.replacementsService.search(replacementUsed)
        .subscribe(replacementsUsed => {
          this.setTableAndRefresh(replacementsUsed);
        })
      );
  }

  addToTable(replacementUsed: ReplacementUsed): void {
    this.replacementsUsed.push(replacementUsed);
    this.replacementsService.updateDataFromTable(this.replacementsUsed);
    this.refreshTable();
  }

  changeReplacementUsedForm(event: MatSelectChange): void {
    console.log(event);
    this.nameReplacementSelectForm = event.source.triggerValue;
    this.setFinalPriceReplacement();
  }

  setTableAndRefresh(replacementsUsed: ReplacementUsed[]): void{
    this.replacementsUsed = replacementsUsed;
    this.refreshTable();
  }

  refreshTable(): void {
    this.dataSource = new MatTableDataSource<ReplacementUsed>(this.replacementsUsed);
    this.updateTotalCost();
  }

  updateTotalCost(): void {
    const cero = 0.00;
    let result: number = cero;
    if (this.replacementsUsed.length > 0){
      result = this.replacementsUsed.map(replacement => replacement.price === undefined ? 0.00 : replacement.price)
        .reduce((previousValue, currentValue) => previousValue + currentValue);
    }
    this.totalCost = result.toFixed(2);
  }

  serializeForm(formData: any): ReplacementUsed {
    return {
      reference: formData.reference,
      quantity: formData.quantity,
      own: formData.own,
      price: parseFloat(formData.price),
      discount: parseInt(formData.discount, 0),
      replacement: {
        reference: formData.replacement,
        name: this.getNameReplacement(formData.replacement)
      },
      revisionReference: formData.revisionReference
    };
  }

  setFinalPriceReplacement(): void {
    let resultPrice = '0.00';
    const quantity = toInteger(this.replacementUsedForm.value.quantity);
    const replacementReference = this.replacementUsedForm.value.replacement;
    const discountPercent = toInteger(this.replacementUsedForm.value.discount) / 100;

    const replacement = this.replacementsOptions.filter(replacementOption => replacementOption.reference === replacementReference)[0];
    if (replacement !== undefined && quantity > 0){
      console.log(this.replacementUsedForm.value);
      resultPrice = (replacement.price * quantity * (1 - discountPercent)).toFixed(2);
      this.replacementUsedForm.patchValue({price: resultPrice});
    }else{
      console.log(this.replacementUsedForm.value);
    }
  }

  getNameReplacement(reference: string): string {
    let result = '';
    if (this.replacementsOptions.length > 0){
      const replacement = this.replacementsOptions.filter(value => value.reference === reference)[0];
      result = replacement.name;
    }

    return result;
  }
}

function templateForm(replacementUsed: ReplacementUsed): FormGroup {
  return new FormGroup({
    reference: new FormControl(replacementUsed.reference),
    quantity: new FormControl(replacementUsed.quantity, [Validators.required, Validators.maxLength(3), Validators.pattern('[0-9]+')]),
    own: new FormControl(replacementUsed.own),
    price: new FormControl(replacementUsed.price, [Validators.maxLength(10), Validators.pattern('^[1-9]\\d*(\\.\\d+)?$')]),
    discount: new FormControl(replacementUsed.discount, [Validators.maxLength(3), Validators.pattern('[0-9]+')]),
    replacement: new FormControl(String(replacementUsed.replacement.reference), [Validators.required]),
    revisionReference: new FormControl(replacementUsed.revisionReference)
  });
}

function hasRevision(replacementUsed: ReplacementUsed): boolean {
  const nullables = [null, undefined];
  return nullables.indexOf(replacementUsed.revisionReference) === -1;
}

function hasReference(replacementUsed: ReplacementUsed): boolean {
  const nullables = ['', null, undefined];
  return nullables.indexOf(replacementUsed.reference) === -1;
}

function toInteger(numberStr: string): number {
  let result = 0;
  const nullables = ['', null, undefined];
  if (nullables.indexOf(numberStr) < 0){
    result = parseInt(numberStr, 0);
  }
  return result;
}

function toFloat(numberStr: string): number {
  let result = 0;
  const nullables = ['', null, undefined];
  if (nullables.indexOf(numberStr) < 0){
    result = parseFloat(numberStr);
  }
  return result;
}
