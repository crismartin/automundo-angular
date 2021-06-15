import {Component, Inject} from '@angular/core';
import {Vehicle} from '../../shared/services/models/vehicle.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {VehicleService} from '../vehicle.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomerCreationUpdate} from '../../customers/customer-dialog/customer-creation-update.model';
import {VehicleType} from '../../shared/services/models/vehicle-type';
import {Observable} from 'rxjs';
import {SharedVehicleTypeService} from '../../shared/services/shared.vehicle-type.service';


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
  vehicleTypes: VehicleType[];

  constructor(@Inject(MAT_DIALOG_DATA) data: Vehicle, private vechicleService: VehicleService,
              private snackBar: MatSnackBar, private dialog: MatDialogRef<VehicleDialogComponent>,
              private sharedVehicleTypeService: SharedVehicleTypeService) {
    this.title = data.reference ? 'Editar vehículo' : 'Crear vehículo';
    this.oldVehicle = !data.reference;
    this.inCreation = !data.reference;

    this.vehicleModel = data.reference ? {
      reference: data.reference,
      plate: data.plate,
      bin: data.bin,
      model: data.model,
      manufacturedDate: data.manufacturedDate,
      yearRelease: data.yearRelease,
      registerDate: data.registerDate,
      lastViewDate: data.lastViewDate,
      customer: data.customer,
      vehicleType: data.vehicleType,
      typeNumber: data.typeNumber,
      identificationCustomer: data.identificationCustomer
    } : templateNewVehicle(data.identificationCustomer);

    this.vehicleForm = templateFormVehicle(this.vehicleModel);

    this.sharedVehicleTypeService.search({active: true})
      .subscribe(vehicleTypes => this.vehicleTypes = vehicleTypes );
  }

  hasError(name: string, errorName: string): boolean {
    return this.vehicleForm.controls[name].hasError(errorName);
  }

  onSubmit(vehicleForm: FormGroup): void {
    if (!vehicleForm.valid) {
      this.snackBar.open('Hay datos inválidos en el formulario', 'Error', {
        duration: 2000
      });
      return;
    }

    const vehicle: Vehicle = {
      reference: vehicleForm.get('referenceId').value,
      plate: vehicleForm.get('plate').value,
      bin: vehicleForm.get('bin').value,
      model: vehicleForm.get('model').value,
      yearRelease: vehicleForm.get('yearRelease').value,
      vehicleType: {reference: vehicleForm.get('vehicleType').value},
      typeNumber: vehicleForm.get('typeNumber').value,
      identificationCustomer: this.vehicleModel.identificationCustomer
    };

    if (this.inCreation) {
      console.log(vehicle);
      this.create(vehicle);
    }else{
      this.update(vehicle);
    }
  }

  private create(vehicle: Vehicle): void {
    this.vechicleService.create(vehicle)
      .subscribe(vehicleSaved => this.dialog.close(vehicleSaved));
  }

  private update(vehicle: Vehicle): void {
    console.log(vehicle);
    this.vechicleService.update(vehicle)
      .subscribe(vehicleSaved => this.dialog.close(vehicleSaved));
  }
}

function templateNewVehicle(identificacionCustomer: string): any{
  return {
    referenceId: '',
    plate: '',
    bin: '',
    model: '',
    manufacturedDate: '',
    registerDate: '',
    lastViewDate: '',
    customer: '',
    vehicleType: {
      reference: ''
    },
    typeNumber: '',
    identificationCustomer: identificacionCustomer
  };
}

function templateFormVehicle(vehicle: Vehicle): FormGroup{
  return new FormGroup({
    referenceId: new FormControl({value: vehicle.reference, disabled: true},
      [Validators.required, Validators.maxLength(7)]),
    plate: new FormControl(vehicle.plate, [Validators.required, Validators.maxLength(7)]),
    bin: new FormControl(vehicle.bin, [Validators.required, Validators.maxLength(7)]),
    model: new FormControl(vehicle.model, [Validators.maxLength(50)]),
    yearRelease: new FormControl(vehicle.yearRelease, [Validators.maxLength(4), Validators.pattern('[0-9]+')]),
    vehicleType: new FormControl(vehicle.vehicleType.reference, [Validators.required]),
    typeNumber: new FormControl(vehicle.typeNumber, [Validators.maxLength(10)])
  });
}
