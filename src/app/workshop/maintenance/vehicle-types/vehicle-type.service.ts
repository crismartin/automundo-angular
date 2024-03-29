import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {VehicleTypeSearch} from '../../shared/services/models/vehicle-type-search.model';
import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {VehicleType} from '../../shared/services/models/vehicle-type';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  private static SEARCH = '/search';

  constructor(private httpService: HttpService) { }

  search(vehicleTypeSearch: VehicleTypeSearch): Observable<VehicleType[]> {
    return this.httpService
      .paramsFrom(vehicleTypeSearch)
      .get(EndPoints.VEHICLE_TYPES + VehicleTypeService.SEARCH);
  }

  read(reference: string): Observable<VehicleType> {
    return this.httpService
      .get(EndPoints.VEHICLE_TYPES + '/' + reference);
  }

  create(vehicleType: VehicleType): Observable<VehicleType> {
    return this.httpService
      .post(EndPoints.VEHICLE_TYPES, vehicleType);
  }

  update(vehicleType: VehicleType, reference: string): Observable<VehicleType> {
    return this.httpService
      .put(EndPoints.VEHICLE_TYPES + '/' + reference, vehicleType);
  }
}
