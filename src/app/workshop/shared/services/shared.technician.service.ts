import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {TechnicianSearch} from './models/technician-search.model';
import {Technician} from '../../shared/services/models/technician';

@Injectable({
  providedIn: 'root'
})
export class SharedTechnicianService {
  private static SEARCH = '/search';

  constructor(private httpService: HttpService) { }

  search(technicianSearch: TechnicianSearch): Observable<Technician[]> {
    return this.httpService
      .paramsFrom(technicianSearch)
      .get(EndPoints.TECHNICIANS + SharedTechnicianService.SEARCH);
  }
}
