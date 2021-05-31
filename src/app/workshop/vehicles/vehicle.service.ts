import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Vehicle} from '../shared/services/models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicle: Vehicle = {
    plate: 'JB-007',
    bin: 'ID-007',
    model: 'Aston Martin DBS Superleggera',
    yearRelease: '2020',
    registerDate: new Date(),
    lastViewDate: new Date(),
    ownerType: 1,
    customer: 'Rochel Barlomento Santilla'
  };
  constructor() { }

  search(idVehicle: string): Observable<Vehicle>{
    return of(this.vehicle);
  }

  create(vehicle: Vehicle): Observable<Vehicle> {
    return of(vehicle);
  }
}
