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

  create(replacement: Replacement): Observable<Replacement> {
    return this.httpService
      .post(EndPoints.REPLACEMENTS, replacement);
  }

  update(replacement: Replacement, reference: string): Observable<Replacement> {
    return this.httpService
      .put(EndPoints.REPLACEMENTS + '/' + reference, replacement);
  }
}
