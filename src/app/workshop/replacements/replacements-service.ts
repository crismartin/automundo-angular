import { Injectable } from '@angular/core';
import {ReplacementUsed} from '../shared/services/models/replacement-used';
import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ReplacementsService {
  replacementUsedItems: ReplacementUsed[];

  constructor(private httpService: HttpService) {
    this.replacementUsedItems = [
      {
        reference: '1',
        quantity: 1,
        own: true,
        replacement: {
          reference: '1',
          name: 'Manguera de aceite'
        },
        price: 150
      },
      {
        reference: '2',
        quantity: 2,
        own: false,
        replacement: {
          reference: '2',
          name: 'Bujía Motor'
        },
        price: 60
      }
    ];
  }

  getDataFromTable(): ReplacementUsed[] {
    return this.replacementUsedItems;
  }

  updateDataFromTable(replacementsUpdated: ReplacementUsed[]): void {
    this.replacementUsedItems = replacementsUpdated;
  }

  create(replacementUsed: ReplacementUsed): Observable<void> {
    return this.httpService
      .post(EndPoints.REPLACEMENTS_USED, replacementUsed);
  }

  update(replacementUsed: ReplacementUsed): Observable<void> {
    return this.httpService
      .put(EndPoints.REPLACEMENTS_USED, replacementUsed);
  }

  search(replacementUsed: ReplacementUsed): void {

  }
}
