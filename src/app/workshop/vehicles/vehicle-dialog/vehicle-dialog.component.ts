import {Component, Inject} from '@angular/core';
import {Vehicle} from '../../shared/services/models/vehicle.model';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {VehicleService} from '../vehicle.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css']
})
export class VehicleDialogComponent {

  title = 'Create/Update Invoice';
  vehicleModel: Vehicle;
  oldVehicle = false;
  vehicleForm: FormGroup;
  inCreation: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) data: Vehicle, private vechicleService: VehicleService,
              private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.title = data ? 'Editar vehículo' : 'Crear vehículo';
    this.oldVehicle = !data;

    this.vehicleModel = data ? {
      plate: data.plate,
      bin: data.bin,
      model: data.model,
      manufacturedDate: data.manufacturedDate,
      yearRelease: data.yearRelease,
      registerDate: data.registerDate,
      lastViewDate: data.lastViewDate,
      customer: data.customer
    } : templateNewVehicle();

    this.vehicleForm = templateFormVehicle(this.vehicleModel);

    this.inCreation = !data;

  }

  hasError(name: string, errorName: string): boolean {
    return this.vehicleForm.controls[name].hasError(errorName);
  }

  onSubmit(vehicleModel: FormGroup): void {
    if (!vehicleModel.valid) {
      this.snackBar.open('Hay datos inválidos en el formulario', 'Error', {
        duration: 2000
      });
      return;
    }
    if (this.inCreation) {
      this.create(this.vehicleModel);
    }
  }

  private create(vehicle: Vehicle): void {
    this.vechicleService.create(vehicle)
      .subscribe(() => this.dialog.closeAll());
  }
}

function templateNewVehicle(): any{
  return {
    plate: '',
    bin: '',
    model: '',
    manufacturedDate: '',
    registerDate: '',
    lastViewDate: '',
    customer: ''
  };
}

function templateFormVehicle(vehicle: Vehicle): FormGroup{
  return new FormGroup({
    plate: new FormControl(vehicle.plate, [Validators.required, Validators.maxLength(7)]),
    bin: new FormControl(vehicle.bin, [Validators.required, Validators.maxLength(7)]),
    model: new FormControl(vehicle.model, [Validators.maxLength(50)]),
    yearRelease: new FormControl(vehicle.yearRelease, [Validators.maxLength(4), Validators.pattern('[0-9]+')]),
    ownerType: new FormControl(vehicle.ownerType, [Validators.required]),
  });
}
