import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Vehicle} from '../shared/services/models/vehicle.model';
import {OwnerType} from '../shared/services/models/owner-type';
import {VehicleItem} from '../customers/vehicle-item';
import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  ownerType: OwnerType = {
    reference: '1',
    name: 'Particular'
  };

  vehiclesItem: VehicleItem[] = [
    {
      referenceId: '1',
      plate: 'JB-007',
      bin: 'ID-007',
      model: 'Aston Martin DBS Superleggera',
      yearRelease: 2020,
      registerDate: new Date(),
      lastViewDate: new Date()
    },
    {
      referenceId: '2',
      plate: 'EM-A37',
      bin: 'ID-A37',
      model: 'Tesla Model S',
      yearRelease: 2020,
      registerDate: new Date(),
      lastViewDate: new Date()
    }];

  vehicles: Vehicle[] = [
    {
      reference: '1',
      plate: 'JB-007',
      bin: 'ID-007',
      model: 'Aston Martin DBS Superleggera',
      yearRelease: 2020,
      registerDate: new Date(),
      lastViewDate: new Date(),
      ownerType: this.ownerType,
      customer: 'Rochel Barlomento Santilla'
    },
    {
      reference: '2',
      plate: 'EM-A37',
      bin: 'ID-A37',
      model: 'Tesla Model S',
      yearRelease: 2020,
      registerDate: new Date(),
      lastViewDate: new Date(),
      ownerType: this.ownerType,
      customer: 'Rochel Barlomento Santilla'
    }];
  constructor(private httpService: HttpService) { }

  searchVehiclesByIdentificationCustomer(identificationId: string): Observable<VehicleItem[]> {
    return this.httpService
      .get(EndPoints.VEHICLES + '/customer/' + identificationId);
  }

  search(reference: string): Observable<Vehicle>{
    // return of(this.vehicles.find(vehicleArray => vehicleArray.referenceId === idVehicle));
    return this.httpService
      .get(EndPoints.VEHICLES + '/' + reference);
  }

  create(vehicle: Vehicle): Observable<Vehicle> {
    console.log(vehicle);
    vehicle.registerDate = new Date();
    vehicle.lastViewDate = new Date();
    const vehicleItem = toVehicleItem(vehicle);
    this.vehiclesItem.push(vehicleItem);
    this.vehicles.push(vehicle);
    return of(vehicle);
  }

  update(vehicleUpdated: Vehicle): Observable<Vehicle> {
    console.log(vehicleUpdated);
    vehicleUpdated.lastViewDate = new Date();
    const vehicleItem = findInArray(this.vehiclesItem, vehicleUpdated.reference);
    updateItem(vehicleItem, vehicleUpdated);
    const vehicle = findInArray(this.vehicles, vehicleUpdated.reference);
    updateItem(vehicle, vehicleUpdated);
    vehicle.ownerType = vehicleUpdated.ownerType;
    return of(vehicleUpdated);
  }

  delete(vehicle: Vehicle): Observable<void> {
    const indexItem = this.vehiclesItem.findIndex(vehicleArray => vehicleArray.referenceId === vehicle.reference);
    const index = this.vehicles.findIndex(vehicleArray => vehicleArray.reference === vehicle.reference);
    this.vehicles.splice(index, 1);
    this.vehiclesItem.splice(indexItem, 1);
    return of(null);
  }

}

function updateItem(vehicle: any, vehicleUpdated: any): void{
  vehicle.yearRelease = vehicleUpdated.yearRelease;
  vehicle.plate = vehicleUpdated.plate;
  vehicle.model = vehicleUpdated.model;
  vehicle.lastViewDate = vehicleUpdated.lastViewDate;
  vehicle.bin = vehicleUpdated.bin;
  vehicle.registerDate = vehicleUpdated.registerDate;
}

function findInArray(array: any[], referenceId: string): any {
  return array.find(element => element.referenceId === referenceId);
}

function toVehicleItem(vehicle: Vehicle): VehicleItem {
  return {
    plate: vehicle.plate,
    bin: vehicle.bin,
    model: vehicle.model,
    yearRelease: vehicle.yearRelease,
    registerDate: vehicle.registerDate,
    lastViewDate: vehicle.lastViewDate
  };
}
