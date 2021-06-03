import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Replacement} from '../../replacements/replacement.model';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ReplacementService} from '../../replacements/replacement.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {VehicleType} from '../vehicle-type.model';

@Component({
  selector: 'app-vehicle-type-dialog',
  templateUrl: './vehicle-type-dialog.component.html',
  styleUrls: ['./vehicle-type-dialog.component.css']
})
export class VehicleTypeDialogComponent implements OnInit {

  public vehicleTypeForm: FormGroup;
  title = 'Crear/Actualizar Tipo de vehículo';
  inCreation: boolean;
  data: VehicleType;

  constructor(@Inject(MAT_DIALOG_DATA) data: VehicleType, private dialog: MatDialog,
              private replacementService: ReplacementService, private snackBar: MatSnackBar) {

    this.title = data ? 'Actualizar Tipo de vehículo' : 'Crear Tipo de vehículo';
    this.inCreation = !data;
    this.data = data;

    this.vehicleTypeForm = data ? new FormGroup({
      reference: new FormControl({value: data.reference, disabled: true}, [Validators.required, Validators.maxLength(6)]),
      name: new FormControl(data.name, [Validators.required, Validators.maxLength(30)]),
      description: new FormControl(data.description, [Validators.maxLength(200)]),
    }) : new FormGroup({
      reference: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      description: new FormControl('', [Validators.maxLength(200)])
    });
  }

  ngOnInit(): void {
  }

  create(vehicleType: VehicleType): void {
    /*this.replacementService
      .create(customer)
      .subscribe(() =>
      Si ha ido MAL cerrar formulario y navegar al detalle del cliente creado
      Si hay ido MAL mostrar snackbar error y no cerrar el formulario
      this.dialog.closeAll());*/
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.vehicleTypeForm.controls[controlName].hasError(errorName);
  }

  onSubmit(vehicleTypeForm: FormGroup): void {
    if (!vehicleTypeForm.valid) {
      this.snackBar.open('Hay datos inválidos en el formulario', 'Error', {
        duration: 2000
      });
      return;
    }
    const vehicleType: VehicleType = {
      reference: vehicleTypeForm.get('reference').value,
      name: vehicleTypeForm.get('name').value,
      description: vehicleTypeForm.get('description').value || null
    };
    if (this.inCreation) {
      this.create(vehicleType);
    } else {
      this.update(vehicleType);
    }
  }

  update(vehicleType: VehicleType): void {
    /*this.replacementService
      .update(vehicleType, this.data.id)
      .subscribe(() =>
      Si ha ido MAL cerrar formulario y navegar al detalle del cliente editado
      Si hay ido MAL mostrar snackbar error y no cerrar el formulario
      this.dialog.closeAll());*/
  }

}
