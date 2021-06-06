import {Injectable} from '@angular/core';
import {VehicleItem} from './vehicle-item';
import {Observable, of} from 'rxjs';
import {CustomerCreationUpdate} from './customer-dialog/customer-creation-update.model';
import {Customer} from '../shared/services/models/customer.model';
import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {Vehicle} from '../shared/services/models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customer: Customer = {
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

  constructor(private httpService: HttpService) {
  }

  create(customer: CustomerCreationUpdate): Observable<Customer> {
    /*return this.httpService
      .post(EndPoints.CUSTOMERS, customer);*/
    return of(this.customer);
  }

  update(customer: CustomerCreationUpdate, id: string): Observable<Customer> {
    /*return this.httpService
      .put(EndPoints.CUSTOMERS + "/" + id, customer);*/
    return of(this.customer);
  }

}
