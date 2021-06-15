import { Component, OnInit } from '@angular/core';
import {ReplacementUsedItem} from '../shared/services/models/replacement-used-item';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSelectChange} from '@angular/material/select';
import {ReplacementsService} from './replacements-service';

let ELEMENTS_DATA: ReplacementUsedItem[];

@Component({
  selector: 'app-replacements',
  templateUrl: './replacements.component.html',
  styleUrls: ['./replacements.component.css']
})
export class ReplacementsComponent {
  replacementUsedForm: FormGroup;
  titleForm = 'Añadir repuesto';
  replacements: ReplacementUsedItem[];
  replacementModel: ReplacementUsedItem;
  showForm = false;
  displayedColumns: string[] = ['quantity', 'replacement.name', 'own', 'price', 'actions'];
  dataSource = new MatTableDataSource(ELEMENTS_DATA);
  nameReplacementSelectForm = '';


  constructor(private snackBar: MatSnackBar, private replacementsService: ReplacementsService) {
    this.replacementModel =  {
      referenceId: '',
      quantity: null,
      own: false,
      replacement: {
        reference: '',
        name: null
      },
      price: null
    };

    this.replacementUsedForm = templateForm(this.replacementModel);

    ELEMENTS_DATA = this.replacementsService.getDataFromTable();
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

  updateReplacement(replacementUsed: ReplacementUsedItem): void {
    this.titleForm = 'Editar Repuesto';
    this.toggleFormReplacement();
    this.replacementUsedForm = templateForm(replacementUsed);
  }

  deleteReplacement(replacemementUsed: ReplacementUsedItem): void {
    console.log(replacemementUsed);
    const indexItem = ELEMENTS_DATA.findIndex(repItem => repItem.replacement.reference === replacemementUsed.replacement.reference);
    ELEMENTS_DATA.splice(indexItem, 1);
    this.refreshTable();
  }

  onSubmit(replacementUsedForm: FormGroup): void {
    if (!replacementUsedForm.valid) {
      this.snackBar.open('Hay datos inválidos en el formulario', 'Error', {
        duration: 2000
      });
      return;
    }

    const replacementUsed: ReplacementUsedItem = {
      referenceId: replacementUsedForm.get('referenceId').value,
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

  saveReplacement(replacementUsed: ReplacementUsedItem): void {
    const replacementFounded = ELEMENTS_DATA.find(replacementArray =>
      replacementArray.replacement.reference === replacementUsed.replacement.reference);

    if (replacementFounded !== undefined){
      replacementFounded.replacement = replacementUsed.replacement;
      replacementFounded.price = replacementUsed.price;
      replacementFounded.own = replacementUsed.own;
      replacementFounded.discount = replacementUsed.discount;
      replacementFounded.quantity = replacementUsed.quantity;
    }else{
      ELEMENTS_DATA.push(replacementUsed);
    }

    this.replacementsService.updateDataFromTable(ELEMENTS_DATA);
    this.refreshTable();
  }

  changeReplacementUsedForm(event: MatSelectChange): void {
    this.nameReplacementSelectForm = event.source.triggerValue;
  }

  refreshTable(): void {
    this.dataSource = new MatTableDataSource(ELEMENTS_DATA);
  }
}

function templateForm(replacementUsed: ReplacementUsedItem): FormGroup {
  return new FormGroup({
    referenceId: new FormControl({value: replacementUsed.referenceId, disabled: true}),
    quantity: new FormControl(replacementUsed.quantity, [Validators.maxLength(3), Validators.pattern('[0-9]+')]),
    own: new FormControl(replacementUsed.own),
    price: new FormControl(replacementUsed.price, [Validators.maxLength(10), Validators.pattern('[0-9]+')]),
    discount: new FormControl(replacementUsed.discount, [Validators.maxLength(3), Validators.pattern('[0-9]+')]),
    replacement: new FormControl(String(replacementUsed.replacement.reference), [Validators.required])
  });
}
