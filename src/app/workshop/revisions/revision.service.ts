import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Revision} from '../shared/services/models/revision';
import {RevisionItem} from '../shared/services/models/revision-item';
import {Technician} from '../shared/services/models/technician';
import {StatusRevision} from '../shared/services/models/status-revision';
import {ReplacementUsed} from '../shared/services/models/replacement-used';
import {EndPoints} from '@shared/end-points';
import {HttpService} from '@core/http.service';
import {concatMap} from 'rxjs/operators';
import {ReplacementsService} from '../replacements/replacements-service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {
  revisionsItems: RevisionItem[] = [
    {
      reference: '1',
      diagnostic: 'Todo roto, todo roto!',
      registerDate: new Date(),
      departureDate: new Date(),
      technicianName: 'Jose Luis Señor',
      statusName: 'ENTREGADO',
      cost: 100
    }
  ];

  technicians: Technician[] = [
    {
      identificationId: '1',
      completeName: 'Jose Luis Señor'
    },
    {
      identificationId: '2',
      completeName: 'Antonio Perez'
    }
  ];

  statusRevision: StatusRevision[] = [
    {
      code: 1,
      description: 'POR CONFIRMAR'
    },
    {
      code: 2,
      description: 'NEGADO'
    },
    {
      code: 3,
      description: 'EN MANTENIMIENTO'
    },
    {
      code: 4,
      description: 'ENTREGADO'
    }
  ];

  replacementsUsed: ReplacementUsed[] = [
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

  revisions: Revision[] = [
    {
      reference: '1',
      diagnostic: 'Todo roto, todo roto!',
      registerDate: new Date(),
      departureDate: new Date(),
      cost: 100,
      initialKilometers: 10000,
      technician: this.technicians[0],
      workedHours: 10,
      departureKilometers: 10001,
      workDescription: 'Se arreglo el alerón del coche',
      status: {
        code: 4,
        description: 'ENTREGADO'
      },
      replacementsUsed: this.replacementsUsed
    }
  ];

  constructor(private httpService: HttpService, private replacementsService: ReplacementsService) { }

  search(vehicleReference: string): Observable<RevisionItem[]> {
    return this.httpService
      .get(EndPoints.REVISIONS + '/vehicle/' + vehicleReference);
  }

  create(revision: Revision): Observable<void> {
    revision.registerDate = normalizeDate(revision.registerDate);
    return this.httpService
      .post(EndPoints.REVISIONS, revision)
      .pipe(
        concatMap(revisionCreated => {
          return this.createReplacementsUsedByRevisionReference(revisionCreated.reference)
            .pipe(
              concatMap(value => {
                return this.printPdf(revisionCreated.reference);
              })
            );
        })
      );
  }

  private createReplacementsUsedByRevisionReference(revisionReference: string): Observable<void> {
    const replacementsUsed = this.replacementsService.getDataFromTable();
    const revision = {revisionReference, replacementsUsed};
    return this.httpService
          .post(EndPoints.REVISIONS + '/replacements-used', revision);
  }

  read(reference: string): Observable<Revision> {
    return this.httpService
      .get(EndPoints.REVISIONS + '/' + reference);
  }

  update(revision: Revision): Observable<void> {
    revision.registerDate = normalizeDate(revision.registerDate);
    revision.departureDate = normalizeDate(revision.departureDate);
    return this.httpService
      .put(EndPoints.REVISIONS, revision);
  }

  delete(reference: string): Observable<any> {
    console.log(reference);
    return this.httpService
      .delete(EndPoints.REVISIONS + '/' + reference);
  }

  printPdf(reference: string): Observable<void> {
    return this.httpService.pdf()
      .paramsFrom({reference})
      .get(EndPoints.REVISIONS + '/print');
  }

}

function getIdGenerate(): string {
  return Math.random().toString(36).substr(2, 9);
}

function toRevisionItem(revision: Revision): RevisionItem {
  const revisionItem: RevisionItem = {
    reference: revision.reference,
    diagnostic: revision.diagnostic,
    registerDate: revision.registerDate,
    departureDate: revision.departureDate,
    technicianName: revision.technician.completeName,
    statusName: revision.status.description
  };
  return revisionItem;
}

function normalizeDate(dateParam: Date): any {
  const nulables: any = [undefined, null, ''];
  return nulables.indexOf(dateParam) < 0 ? moment(dateParam).add(2, 'hour') : undefined;
}
