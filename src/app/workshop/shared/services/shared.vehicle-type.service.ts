import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {VehicleTypeSearch} from './models/vehicle-type-search.model';
import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {VehicleType} from '../../shared/services/models/vehicle-type';

@Injectable({
  providedIn: 'root'
})
export class SharedVehicleTypeService {

  private static SEARCH = '/search';

  constructor(private httpService: HttpService) { }

  search(vehicleTypeSearch: VehicleTypeSearch): Observable<VehicleType[]> {
    return this.httpService
      .paramsFrom(vehicleTypeSearch)
      .get(EndPoints.VEHICLE_TYPES + SharedVehicleTypeService.SEARCH);
  }
}
