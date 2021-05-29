import { Component, OnInit } from '@angular/core';
import {Customer} from './customer.model';
import {CustomerContact} from './customer-contact.model';

@Component({
  selector: 'app-clients',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerModel: Customer;

  constructor() {
    const contactCustomer: CustomerContact = {
      phone: '062915431',
      mobilePhone: '0995131297',
      address: 'Calle Falsa 123, Tulcán, Ecuador',
      email: 'rochel@gmail.com'
    };

    this.customerModel = {
      completeName: 'Rochel Barlomento Santilla',
      identificationId: '040090989-0',
      contact: contactCustomer
    };

  }

  ngOnInit(): void {
  }

}
