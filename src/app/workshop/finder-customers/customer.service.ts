import { Injectable } from '@angular/core';
import {CustomerSearch} from './customer-search.model';
import {Observable, of} from 'rxjs';
import {Customer} from '../shared/services/models/customer.model';
import {HttpService} from '@core/http.service';

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

  constructor(private httpService: HttpService) { }

  search(customerSearch: CustomerSearch): Observable<Customer[]> {
    /*return this.httpService
      .paramsFrom(vehicleSearch)
      .get(EndPoints.VEHICLES + VehicleService.SEARCH);*/
    return of(this.customers);
  }
}
