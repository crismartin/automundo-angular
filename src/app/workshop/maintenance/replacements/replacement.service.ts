import { Injectable } from '@angular/core';
import {ReplacementSearch} from './replacement-search.model';
import {Observable, of} from 'rxjs';
import {Replacement} from './replacement.model';
import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';

@Injectable({
  providedIn: 'root'
})
export class ReplacementService {
  private static SEARCH = '/search';
  private replacements: Replacement[] = [{
    reference: '111111',
    name: 'Repuesto1',
    price: 11,
    description: 'Este repuesto vale para coches'
  },{
    reference: '222222',
    name: 'Repuesto2',
    price: 22.5,
    description: 'Este repuesto vale para coches 2'
  },{
    reference: '333333',
    name: 'Repuesto3',
    price: 23.5,
    description: 'Este repuesto vale para coches 3'
  },
  ];

  constructor(private httpService: HttpService) { }

  search(replacementSearch: ReplacementSearch): Observable<Replacement[]> {
    return this.httpService
      .paramsFrom(replacementSearch)
      .get(EndPoints.REPLACEMENTS + ReplacementService.SEARCH);
  }

  read(reference: string): Observable<Replacement> {
    return this.httpService
      .get(EndPoints.REPLACEMENTS + '/' + reference);
  }

  delete(reference: string): Observable<void> {
    /*return this.httpService
      .delete(EndPoints.REPLACEMENTS + '/' + reference);*/
    return of();
  }

  create(replacement: Replacement): Observable<Replacement> {
    return this.httpService
      .post(EndPoints.REPLACEMENTS, replacement);
  }

  update(replacement: Replacement, reference: string): Observable<Replacement> {
    return this.httpService
      .put(EndPoints.REPLACEMENTS + '/' + reference, replacement);
  }
}
