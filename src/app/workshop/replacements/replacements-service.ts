import { Injectable } from '@angular/core';
import {ReplacementUsedItem} from '../shared/services/models/replacement-used-item';

let ELEMENTS_DATA: ReplacementUsedItem[] = [
  {
    referenceId: '1',
    quantity: 1,
    own: true,
    replacement: {
      referenceId: '1',
      name: 'Manguera de aceite'
    },
    price: 150
  },
  {
    referenceId: '2',
    quantity: 2,
    own: false,
    replacement: {
      referenceId: '2',
      name: 'Bujía Motor'
    },
    price: 60
  }
];

@Injectable({
  providedIn: 'root'
})
export class ReplacementsService {

  constructor() { }

  getDataFromTable(): ReplacementUsedItem[] {
    return ELEMENTS_DATA;
  }

  updateDataFromTable(replacementsUpdated: ReplacementUsedItem[]): void {
    ELEMENTS_DATA = replacementsUpdated;
  }
}
