import { Injectable } from '@angular/core';
import {VehicleItem} from './vehicle-item';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  vehicles: VehicleItem[] = [{
    plate: 'JB-007',
    bin: 'ID-007',
    model: 'Aston Martin DBS Superleggera',
    yearRelease: '2020',
    registerDate: new Date(),
    lastViewDate: new Date()
  }];

  constructor() { }

  search(): Observable<VehicleItem[]> {
    return of(this.vehicles);
  }
}
