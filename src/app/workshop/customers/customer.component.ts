import { Component, OnInit } from '@angular/core';

import {Observable, of} from 'rxjs';
import {CustomerService} from './customer.service';
import {Customer} from '../shared/services/models/customer.model';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {VehicleDialogComponent} from '../vehicles/vehicle-dialog/vehicle-dialog.component';
import {VehicleService} from '../vehicles/vehicle.service';
import {Vehicle} from '../shared/services/models/vehicle.model';

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
  customerModel: Customer;

  constructor(private dialog: MatDialog, private customerService: CustomerService, private activatedRoute: ActivatedRoute,
              private vehicleService: VehicleService) {
    this.customers = [{
      id: '15',
      completeName: 'Rochel Barlomento Santilla',
      identificationId: '040090989-0',
      phone: '062915431',
      mobilePhone: '0995131297',
      address: 'Calle Falsa 123, Tulcán, Ecuador',
      email: 'rochel@gmail.com'
    }];

    this.customerModel = this.customers[0];

    this.resetSearch();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idClient = params.get('id');
      let clientFound = this.customers.find(customer => customer.identificationId === this.idClient);
      this.customerModel = this.customers[0];
    });
  }

  createVehicle(): void {
    this.dialog
      .open(VehicleDialogComponent)
      .afterClosed()
      .subscribe(vehicle => {
        console.log(vehicle);
        this.customerService.addVehicleDummy(vehicle);
        this.searchVehicles();
      });
  }

  printVehicle($event: any): void {

  }

  updateVehicle(vehicle: Vehicle): void {
    console.log(vehicle);
    this.dialog
      .open(VehicleDialogComponent, {data: vehicle})
      .afterClosed()
      .subscribe((vehicleUpdated) => {
          console.log(vehicleUpdated);
          this.customerService.updateVehicleDummy(vehicleUpdated);
          this.searchVehicles();
        }
      );
  }

  resetSearch(): void {
    this.searchVehicles();
  }

  searchVehicles(): void {
    this.vehicles = this.customerService.searchVehiclesByIdCustomer(this.customerModel.id);
  }

  deleteVehicle(vehicle: Vehicle): void {
    this.vehicleService.delete(vehicle)
      .subscribe(() => {
        this.customerService.deleteVehicleDummy(vehicle);
        this.searchVehicles();
      });

  }
}
