import { Component, OnInit } from '@angular/core';

import {config, of} from 'rxjs';
import {CustomerService} from './customer.service';
import {Customer} from '../shared/services/models/customer.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {VehicleDialogComponent} from '../vehicles/vehicle-dialog/vehicle-dialog.component';
import {VehicleService} from '../vehicles/vehicle.service';
import {Vehicle} from '../shared/services/models/vehicle.model';
import {VehicleItem} from './vehicle-item';
import {CancelYesDialogComponent} from '@shared/dialogs/cancel-yes-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-clients',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Customer[];
  vehicles = of([]);
  title = 'Vehículos asociados';
  idClient: string;
  customer: any = {};

  constructor(private dialog: MatDialog, private customerService: CustomerService, private activatedRoute: ActivatedRoute,
              private vehicleService: VehicleService, private router: Router, private snackBar: MatSnackBar) {
    this.customers = [{
      id: '15',
      completeName: 'Rochel Barlomento Santilla',
      identificationId: '040090989-0',
      phone: '062915431',
      mobilePhone: '0995131297',
      address: 'Calle Falsa 123, Tulcán, Ecuador',
      email: 'rochel@gmail.com'
    }];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.customerService.read(params.get('id'))
        .subscribe(customer => {
          this.customer = customer;
          this.customer.completeName = this.buildCompleteName(customer.name, customer.surName, customer.secondSurName);
          this.resetSearch();
        });
    });
  }

  createVehicle(): void {
    const vehicle: Vehicle = {
      identificationCustomer: this.customer.identificationId
    };

    this.dialog
      .open(VehicleDialogComponent, {data: vehicle})
      .afterClosed()
      .subscribe(() => this.searchVehicles());
  }

  detailsVehicle(vehicle: Vehicle): void {
    this.router.navigate(['/taller/vehiculo', vehicle.reference]);
  }

  updateVehicle(vehicleItem: VehicleItem): void {
    console.log(vehicleItem);
    this.vehicleService.search(vehicleItem.reference)
      .subscribe((vehicle: Vehicle) =>
        this.dialog
          .open(VehicleDialogComponent, {data: vehicle})
          .afterClosed()
          .subscribe(() => this.searchVehicles())
      );
  }

  resetSearch(): void {
    this.searchVehicles();
  }

  searchVehicles(): void {
    this.vehicles = this.vehicleService.searchVehiclesByIdentificationCustomer(this.customer.identificationId);
  }

  deleteVehicle(vehicle: Vehicle): void {
    const dialogTitle = 'Dar de baja';
    const dialogText = '¿Realmente desea dar de baja el vehículo "' + vehicle.model + '" ? Se eliminarán también sus revisiones asociadas.';
    this.dialog.open(CancelYesDialogComponent, {data: {title: dialogTitle, text: dialogText}}).afterClosed().subscribe(
      result => {
        if (result) {
          this.vehicleService.delete(vehicle.reference).subscribe(
            () => {
              this.snackBar.open('Vehículo eliminado correctamente', '', {
                duration: 3500
              });
              this.searchVehicles();
            }
          );
        }
      }
    );
  }

  buildCompleteName(name: string, surName: string, secondSurName: string): string {
    return name + ' ' + surName + ' ' + secondSurName;
  }
}
