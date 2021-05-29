import { Component, OnInit } from '@angular/core';

import {Observable, of} from 'rxjs';
import {CustomerService} from './customer.service';
import {Customer} from '../shared/services/models/customer.model';

@Component({
  selector: 'app-clients',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  customerModel: Customer;
  vehicles = of([]);
  title = 'Vehículos asociados';

  constructor(private customerService: CustomerService) {
    this.customerModel = {
      completeName: 'Rochel Barlomento Santilla',
      identificationId: '040090989-0',
      phone: '062915431',
      mobilePhone: '0995131297',
      address: 'Calle Falsa 123, Tulcán, Ecuador',
      email: 'rochel@gmail.com'
    };

    this.resetSearch();
  }

  createVehicle(): void {

  }

  printVehicle($event: any): void {

  }

  updateVehicle($event: any): void {

  }

  resetSearch(): void {
    this.search();
  }

  search(): void {
    this.vehicles = this.customerService.search();
  }
}
