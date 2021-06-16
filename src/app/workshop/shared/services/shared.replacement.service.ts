import { Injectable } from '@angular/core';
import {ReplacementSearch} from './models/replacement-search.model';
import {Observable} from 'rxjs';

import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {Replacement} from '../../shared/services/models/replacement';

@Injectable({
  providedIn: 'root'
})
export class SharedReplacementService {
  private static SEARCH = '/search';

  constructor(private httpService: HttpService) { }

  search(replacementSearch: ReplacementSearch): Observable<Replacement[]> {
    return this.httpService
      .paramsFrom(replacementSearch)
      .get(EndPoints.REPLACEMENTS + SharedReplacementService.SEARCH);
  }
}
