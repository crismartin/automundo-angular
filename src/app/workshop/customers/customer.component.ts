import { Component, OnInit } from '@angular/core';

import {Observable, of} from 'rxjs';
import {CustomerService} from './customer.service';
import {Customer} from '../shared/services/models/customer.model';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute) {
    this.customers = [{
      completeName: 'Rochel Barlomento Santilla',
      identificationId: '040090989-0',
      phone: '062915431',
      mobilePhone: '0995131297',
      address: 'Calle Falsa 123, Tulcán, Ecuador',
      email: 'rochel@gmail.com'
    }];

    this.resetSearch();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idClient = params.get('id');
      let clientFound = this.customers.find(customer => customer.identificationId === this.idClient);
      this.customerModel = clientFound;
    });
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
