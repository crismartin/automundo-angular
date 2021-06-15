import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {TechnicianSearch} from './technician-search.model';
import {Technician} from '../../shared/services/models/technician';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {
  private static SEARCH = '/search';

  constructor(private httpService: HttpService) { }

  search(technicianSearch: TechnicianSearch): Observable<Technician[]> {
    return this.httpService
      .paramsFrom(technicianSearch)
      .get(EndPoints.TECHNICIANS + TechnicianService.SEARCH);
  }

  read(identificationId: string): Observable<Technician> {
    return this.httpService
      .get(EndPoints.TECHNICIANS + '/' + identificationId);
  }

  create(technician: Technician): Observable<Technician> {
    return this.httpService
      .post(EndPoints.TECHNICIANS, technician);
  }

  update(technician: Technician, identificationId: string): Observable<Technician> {
    return this.httpService
      .put(EndPoints.TECHNICIANS + '/' + identificationId, technician);
  }
}
