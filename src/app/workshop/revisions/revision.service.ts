import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Revision} from '../shared/services/models/revision';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {
  revisions = [
    {
      registerDate: new Date(),
      diagnostic: 'Todo roto, todo roto!',
      workDescription: 'Se ha arreglado la maneguera del agua para el cristal',
      initialKilometers: 50000,
      cost: 100
    }
  ];
  constructor() { }

  search(idVehicle: string): Observable<Revision[]> {
    return of(this.revisions);
  }
}
