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

  vehicles: VehicleItem[] = [
    {
      plate: 'JB-007',
      bin: 'ID-007',
      model: 'Aston Martin DBS Superleggera',
      yearRelease: '2020',
      registerDate: new Date(),
      lastViewDate: new Date()
    },
    {
      plate: 'EM-A37',
      bin: 'ID-A37',
      model: 'Tesla Model S',
      yearRelease: '2020',
      registerDate: new Date(),
      lastViewDate: new Date()
    }];

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

  searchVehiclesByIdCustomer(id: string): Observable<VehicleItem[]> {
    return of(this.vehicles);
  }

  create(customer: CustomerCreationUpdate): Observable<Customer> {
    /*return this.httpService
      .post(EndPoints.CUSTOMERS, customer);*/
    return of(this.customer);
  }

  addVehicleDummy(vehicle: Vehicle): void {
    this.vehicles.push(this.toVehicleItem(vehicle));
  }

  toVehicleItem(vehicle: Vehicle): VehicleItem {
    return {
      plate: vehicle.plate,
      bin: vehicle.bin,
      model: vehicle.model,
      yearRelease: vehicle.yearRelease,
      registerDate: vehicle.registerDate,
      lastViewDate: vehicle.lastViewDate
    };
  }
}
