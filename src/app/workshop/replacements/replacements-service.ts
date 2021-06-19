import { Injectable } from '@angular/core';
import {ReplacementUsed} from '../shared/services/models/replacement-used';
import {HttpService} from '@core/http.service';
import {EndPoints} from '@shared/end-points';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ReplacementsService {
  revisionReference: string;
  replacementUsedItems: ReplacementUsed[];

  constructor(private httpService: HttpService) {
  }

  setRevisionReference(revisionReference: string): void{
    this.revisionReference = revisionReference;
  }

  getDataFromTable(): ReplacementUsed[] {
    return this.replacementUsedItems;
  }

  updateDataFromTable(replacementsUpdated: ReplacementUsed[]): void {
    this.replacementUsedItems = replacementsUpdated;
  }

  create(replacementUsed: ReplacementUsed): Observable<void> {
    replacementUsed.revisionReference = this.revisionReference;
    return this.httpService
      .post(EndPoints.REPLACEMENTS_USED, replacementUsed);
  }

  update(replacementUsed: ReplacementUsed): Observable<void> {
    return this.httpService
      .put(EndPoints.REPLACEMENTS_USED, replacementUsed);
  }

  search(replacementUsed: ReplacementUsed): Observable<ReplacementUsed[]> {
    return this.httpService
      .param('reference', replacementUsed.revisionReference)
      .get(EndPoints.REPLACEMENTS_USED + '/revision');
  }
}
