import { Injectable } from '@angular/core';
import {HttpService} from '@core/http.service';
import {VehicleSearch} from './vehicle-search.model';
import {Observable, of} from 'rxjs';
import {Vehicle} from '../shared/services/models/vehicle.model';
import {EndPoints} from '@shared/end-points';
import {Customer} from '../shared/services/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private static SEARCH = '/search';

  private customer: Customer = {
    completeName: 'Mario Hermoso Rodríguez',
    identificationId: '46731192-D',
    registrationDate: new Date(),
    lastVisitDate: new Date(),
    phone: '919467882',
    mobilePhone: '678903665',
    address: 'C/ Chile, n22',
    email: 'mario.hermoso@gmail.com'
  };

  private vehicles: Vehicle [] = ([
    {
      plate: '11111',
      bin: '11111',
      model: 'Opel',
      customer: this.customer.completeName,
    },
    {
      plate: '11111',
      bin: '22222',
      model: 'Seat',
      customer: this.customer.completeName,
    },
    {
      plate: '11111',
      bin: '333333',
      model: 'Audi',
      customer: this.customer.completeName,
    },
    {
      plate: '11111',
      bin: '444444',
      model: 'Skoda',
      customer: this.customer.completeName,
    },
    {
      plate: '11111',
      bin: '444444',
      model: 'Skoda',
      customer: this.customer.completeName,
    },
    {
      plate: '11111',
      bin: '444444',
      model: 'Skoda',
      customer: this.customer.completeName,
    },
    {
      plate: '11111',
      bin: '444444',
      model: 'Skoda',
      customer: this.customer.completeName,
    },
    {
      plate: '11111',
      bin: '444444',
      model: 'Skoda',
      customer: this.customer.completeName,
    }
  ]);

  constructor(private httpService: HttpService) {
  }

  search(vehicleSearch: VehicleSearch): Observable<Vehicle[]> {
    /*return this.httpService
      .paramsFrom(vehicleSearch)
      .get(EndPoints.VEHICLES + VehicleService.SEARCH);*/
    return of(this.vehicles);
  }
}
