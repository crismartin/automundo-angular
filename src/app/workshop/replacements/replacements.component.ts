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
      this.replacementsService.update(replacementUsed)
        .subscribe(() => this.replacementsService.search(replacementUsed));
    }else{
      if ( hasRevision(replacementUsed) ) {
        this.replacementsService.create(replacementUsed)
          .subscribe(() => this.replacementsService.search(replacementUsed));
      }else{
        this.replacementsUsed.push(replacementUsed);
        this.replacementsService.updateDataFromTable(this.replacementsUsed);
        this.refreshTable();
      }
    }
  }

  changeReplacementUsedForm(event: MatSelectChange): void {
    this.nameReplacementSelectForm = event.source.triggerValue;
  }

  refreshTable(): void {
    this.dataSource = new MatTableDataSource<ReplacementUsed>(this.replacementsUsed);
  }

  serializeForm(formData: any): ReplacementUsed {
    return {
      reference: formData.reference,
      quantity: formData.quantity,
      own: formData.own,
      price: formData.price,
      discount: formData.discount,
      replacement: {
        reference: formData.replacement
      },
      revisionReference: formData.revisionReference
    };
  }
}

function templateForm(replacementUsed: ReplacementUsed): FormGroup {
  return new FormGroup({
    reference: new FormControl(replacementUsed.reference),
    quantity: new FormControl(replacementUsed.quantity, [Validators.maxLength(3), Validators.pattern('[0-9]+')]),
    own: new FormControl(replacementUsed.own),
    price: new FormControl(replacementUsed.price, [Validators.maxLength(10), Validators.pattern('^[1-9]\\d*(\\.\\d+)?$')]),
    discount: new FormControl(replacementUsed.discount, [Validators.maxLength(3), Validators.pattern('[0-9]+')]),
    replacement: new FormControl(String(replacementUsed.replacement.reference), [Validators.required]),
    revisionReference: new FormControl(replacementUsed.revisionReference)
  });
}

function hasRevision(replacementUsed: ReplacementUsed): boolean {
  return replacementUsed.revisionReference !== undefined;
}

function hasReference(replacementUsed: ReplacementUsed): boolean {
  const nullables = ['', null, undefined];
  return nullables.indexOf(replacementUsed.reference) === -1;
}
