import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Replacement} from '../replacement.model';
import {ReplacementService} from '../replacement.service';

@Component({
  selector: 'app-replacement-dialog',
  templateUrl: './replacement-dialog.component.html',
  styleUrls: ['./replacement-dialog.component.css']
})
export class ReplacementDialogComponent implements OnInit {

  public replacementForm: FormGroup;
  title = 'Crear/Actualizar Repuesto';
  inCreation: boolean;
  data: Replacement;

  constructor(@Inject(MAT_DIALOG_DATA) data: Replacement, private dialog: MatDialog,
              private replacementService: ReplacementService, private snackBar: MatSnackBar) {
    this.title = data ? 'Actualizar Repuesto' : 'Crear Repuesto';
    this.inCreation = !data;
    this.data = data;

    this.replacementForm = data ? new FormGroup({
      reference: new FormControl({value: data.reference, disabled: true}, [Validators.required, Validators.maxLength(10)]),
      name: new FormControl(data.name, [Validators.required, Validators.maxLength(30)]),
      price: new FormControl(data.price, [Validators.required]),
      description: new FormControl(data.description, [Validators.maxLength(200)]),
      active: new FormControl(data.active),
    }) : new FormGroup({
      reference: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.maxLength(200)])
    });
  }

  ngOnInit(): void {
  }

  create(replacement: Replacement): void {
    this.replacementService
      .create(replacement)
      .subscribe(replacementCreated => {
        this.snackBar.open('Repuesto creado correctamente', '', {
          duration: 3500
        });
        this.dialog.closeAll();
      });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.replacementForm.controls[controlName].hasError(errorName);
  }

  onSubmit(replacementForm: FormGroup): void {
    if (!replacementForm.valid) {
      this.snackBar.open('Hay datos inválidos en el formulario', 'Error', {
        duration: 2000
      });
      return;
    }
    const replacement: Replacement = {
      reference: replacementForm.get('reference').value,
      name: replacementForm.get('name').value,
      price: replacementForm.get('price').value,
      description: replacementForm.get('description').value || null,
      active: this.inCreation ? true : replacementForm.get('active').value
    };
    if (this.inCreation) {
      this.create(replacement);
    } else {
      this.update(replacement);
    }
  }

  update(replacement: Replacement): void {
    this.replacementService
      .update(replacement, this.data.reference)
      .subscribe(customerUpdated => {
        this.snackBar.open('Repuesto editado correctamente', '', {
          duration: 3500
        });
        this.dialog.closeAll();
      });
  }

}
