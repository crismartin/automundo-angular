import { Injectable } from '@angular/core';
import {CustomerSearch} from './customer-search.model';
import {Observable, of} from 'rxjs';
import {Customer} from '../shared/services/models/customer.model';
import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customers: Customer [] = ([
    {
      identificationId: '040090989-0',
      completeName: 'Rochel Barlomento Santilla',
      mobilePhone: '0995131297',
      address: 'Calle Falsa 123, Tulcán, Ecuador'
    },
    {
      identificationId: '12112121-0',
      completeName: 'Mikel Sanabria Sánchez',
      mobilePhone: '0995131297',
      address: 'Calle Chile 123, Coslada, Madrid'
    }
  ]);

  private fullCustomer: Customer = {
    id: '33',
    identificationId: '12121221-T',
    completeName: 'Pepe Campos Pino',
    name: 'Pepe',
    surName: 'Campos',
    secondSurName: 'Pino',
    phone: '261771781',
    mobilePhone: '678189911',
    address: 'C/ Castellana, 122, Madrid',
    email: 'pepe@gmail.com'
  };

  constructor(private httpService: HttpService) { }

  search(customerSearch: CustomerSearch): Observable<Customer[]> {
    /*return this.httpService
      .paramsFrom(vehicleSearch)
      .get(EndPoints.VEHICLES + VehicleService.SEARCH);*/
    return of(this.customers);
  }

  read(identificationId: string): Observable<Customer> {
    /*return this.httpService
      .get(EndPoints.CUSTOMERS + '/' + identificationId);*/
    return of(this.fullCustomer);
  }
}
