import { Component, OnInit } from '@angular/core';
import {ReplacementUsed} from '../shared/services/models/replacement-used';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSelectChange} from '@angular/material/select';
import {ReplacementsService} from './replacements-service';


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


  constructor(private snackBar: MatSnackBar, private replacementsService: ReplacementsService) {
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
      price: null
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
    this.refreshTable();
  }

  onSubmit(replacementUsedForm: FormGroup): void {
    if (!replacementUsedForm.valid) {
      this.snackBar.open('Hay datos inválidos en el formulario', 'Error', {
        duration: 2000
      });
      return;
    }

    const replacementUsed: ReplacementUsed = {
      reference: replacementUsedForm.get('referenceId').value,
      quantity: replacementUsedForm.get('quantity').value,
      discount: replacementUsedForm.get('discount').value,
      own: replacementUsedForm.get('own').value,
      price: replacementUsedForm.get('price').value,
      replacement: {
        reference: replacementUsedForm.get('replacement').value,
        name: this.nameReplacementSelectForm
      }
    };

    this.saveReplacement(replacementUsed);

    this.toggleFormReplacement();
  }

  saveReplacement(replacementUsed: ReplacementUsed): void {
    const replacementFounded = this.replacementsUsed.find(replacementArray =>
      replacementArray.replacement.reference === replacementUsed.replacement.reference);

    if (replacementFounded !== undefined){
      replacementFounded.replacement = replacementUsed.replacement;
      replacementFounded.price = replacementUsed.price;
      replacementFounded.own = replacementUsed.own;
      replacementFounded.discount = replacementUsed.discount;
      replacementFounded.quantity = replacementUsed.quantity;
    }else{
      this.replacementsUsed.push(replacementUsed);
    }

    this.replacementsService.updateDataFromTable(this.replacementsUsed);
    this.refreshTable();
  }

  changeReplacementUsedForm(event: MatSelectChange): void {
    this.nameReplacementSelectForm = event.source.triggerValue;
  }

  refreshTable(): void {
    this.dataSource = new MatTableDataSource<ReplacementUsed>(this.replacementsUsed);
  }
}

function templateForm(replacementUsed: ReplacementUsed): FormGroup {
  return new FormGroup({
    referenceId: new FormControl({value: replacementUsed.reference, disabled: true}),
    quantity: new FormControl(replacementUsed.quantity, [Validators.maxLength(3), Validators.pattern('[0-9]+')]),
    own: new FormControl(replacementUsed.own),
    price: new FormControl(replacementUsed.price, [Validators.maxLength(10), Validators.pattern('[0-9]+')]),
    discount: new FormControl(replacementUsed.discount, [Validators.maxLength(3), Validators.pattern('[0-9]+')]),
    replacement: new FormControl(String(replacementUsed.replacement.reference), [Validators.required])
  });
}
