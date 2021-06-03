import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {VehicleType} from './vehicle-type.model';
import {VehicleTypeSearch} from './vehicle-type-search.model';
import {HttpService} from '@core/http.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  private static SEARCH = '/search';
  private vehicleTypes: VehicleType[] = [{
    reference: '111111',
    name: 'Tipo1',
    description: 'Vehículos del gobierno'
  },{
    reference: '222222',
    name: 'Tipo2',
    description: 'Vehículos de 3 ruedas'
  },{
    reference: '333333',
    name: 'Tipo3',
    description: 'Vehículos mate'
  }];

  constructor(private httpService: HttpService) { }

  search(vehicleTypeSearch: VehicleTypeSearch): Observable<VehicleType[]> {
    /*return this.httpService
      .paramsFrom(vehicleTypeSearch)
      .get(EndPoints.VEHICLE_TYPES + VehicleTypeService.SEARCH);*/
    return of(this.vehicleTypes);
  }

  read(reference: string): Observable<VehicleType> {
    /*return this.httpService
      .get(EndPoints.VEHICLE_TYPES + '/' + reference);*/
    return of(this.vehicleTypes[0]);
  }
}
