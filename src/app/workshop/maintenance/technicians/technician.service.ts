import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {Technician} from './technician.model';
import {TechnicianSearch} from './technician-search.model';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {
  private static SEARCH = '/search';
  public static technicians: Technician[] = [{
    identificationId: '11111111-T',
    ssNumber: '0000000001',
    completeName: 'Juan López Mármol',
    registrationDate: new Date(),
    leaveDate: new Date(),
    mobile: '675489302',
    active: true
  }];

  public technician: Technician = {
    identificationId: '11111111-T',
    ssNumber: '0000000001',
    completeName: 'Juan López Mármol',
    registrationDate: new Date(),
    leaveDate: new Date(),
    mobile: '675489302',
    name: 'Juan',
    surName: 'López',
    secondSurName: 'Mármol',
    active: true
  };

  constructor(private httpService: HttpService) { }

  search(technicianSearch: TechnicianSearch): Observable<Technician[]> {
    /*return this.httpService
      .paramsFrom(technicianSearch)
      .get(EndPoints.TECHNICIANS + TechnicianService.SEARCH);*/
    return of(TechnicianService.technicians);
  }

  read(identificationId: string): Observable<Technician> {
    /*return this.httpService
      .get(EndPoints.TECHNICIANS + '/' + identificationId);*/
    return of(this.technician);
  }

  create(technician: Technician): Observable<Technician> {
    /*return this.httpService
      .post(EndPoints.TECHNICIANS, technician);*/
    return of(this.technician);
  }

  update(technician: Technician, identificationId: string): Observable<Technician> {
    /*return this.httpService
      .put(EndPoints.TECHNICIANS + '/' + identificationId, technician);*/
    return of(this.technician);
  }
}
