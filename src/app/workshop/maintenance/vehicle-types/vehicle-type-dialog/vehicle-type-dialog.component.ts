import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {VehicleType} from '../vehicle-type.model';
import {VehicleTypeService} from '../vehicle-type.service';

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
              private vehicleTypeService: VehicleTypeService, private snackBar: MatSnackBar) {

    this.title = data ? 'Actualizar Tipo de vehículo' : 'Crear Tipo de vehículo';
    this.inCreation = !data;
    this.data = data;

    this.vehicleTypeForm = data ? new FormGroup({
      reference: new FormControl({value: data.reference, disabled: true}, [Validators.required, Validators.maxLength(10)]),
      name: new FormControl(data.name, [Validators.required, Validators.maxLength(30)]),
      description: new FormControl(data.description, [Validators.maxLength(200)]),
    }) : new FormGroup({
      reference: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      description: new FormControl('', [Validators.maxLength(200)])
    });
  }

  ngOnInit(): void {
  }

  create(vehicleType: VehicleType): void {
    this.vehicleTypeService
      .create(vehicleType)
      .subscribe(vehicleTypeCreated => {
        this.snackBar.open('Tipo de vehículo creado correctamente', '', {
          duration: 3500
        });
        this.dialog.closeAll();
      });
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
    this.vehicleTypeService
      .update(vehicleType, this.data.reference)
      .subscribe(vehicleTypeUpdated => {
        this.snackBar.open('Tipo de vehículo editado correctamente', '', {
          duration: 3500
        });
        this.dialog.closeAll();
      });
  }

}
