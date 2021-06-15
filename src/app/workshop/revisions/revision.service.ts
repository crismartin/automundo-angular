import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Revision} from '../shared/services/models/revision';
import {Vehicle} from '../shared/services/models/vehicle.model';
import {RevisionItem} from '../shared/services/models/revision-item';
import {Technician} from '../shared/services/models/technician';
import {StatusRevision} from '../shared/services/models/status-revision';
import {ReplacementUsedItem} from '../shared/services/models/replacement-used-item';
import {EndPoints} from '@shared/end-points';
import {HttpService} from '@core/http.service';

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

  replacementsUsed: ReplacementUsedItem[] = [
    {
      referenceId: '1',
      quantity: 1,
      own: true,
      replacement: {
        reference: '1',
        name: 'Manguera de aceite'
      },
      price: 150
    },
    {
      referenceId: '2',
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

  constructor(private httpService: HttpService) { }

  search(vehicleReference: string): Observable<RevisionItem[]> {
    return this.httpService
      .get(EndPoints.REVISIONS + '/vehicle/' + vehicleReference);
  }

  create(revision: Revision): Observable<Revision> {
    return this.httpService
      .post(EndPoints.REVISIONS, revision);
  }

  read(referenceId: string): Observable<Revision> {
    const revision = this.revisions.find(revisionArray => revisionArray.reference === referenceId);
    return of(revision);
  }

  update(revisionUpdated: Revision): Observable<RevisionItem> {
    const revision = this.revisions.find(revisionArray => revisionArray.reference === revisionUpdated.reference);
    revision.diagnostic = revisionUpdated.diagnostic;
    revision.registerDate = revisionUpdated.registerDate;
    revision.initialKilometers = revisionUpdated.initialKilometers;
    revision.technician = this.technicians.find(technician => technician.identificationId === revisionUpdated.technician.identificationId );
    revision.workedHours = revisionUpdated.workedHours;
    revision.departureDate = revisionUpdated.departureDate;
    revision.departureKilometers = revisionUpdated.departureKilometers;
    revision.workDescription = revisionUpdated.workDescription;
    revision.status = this.statusRevision.find(statusArray => String(statusArray.code) === String(revisionUpdated.status.code));

    const revisionItem = this.revisionsItems.find(revisionArray => revisionArray.reference === revisionUpdated.reference);
    revisionItem.technicianName = revision.technician.completeName;
    revisionItem.cost = revision.cost;
    revisionItem.departureDate = revision.departureDate;
    revisionItem.diagnostic = revision.diagnostic;
    revisionItem.registerDate = revision.registerDate;
    revisionItem.statusName = revision.status.description;
    return of(revision);
  }

  delete(referenceId: string): Observable<any> {
    console.log(referenceId);
    const indexItem = this.revisionsItems.findIndex(revItem => revItem.reference === referenceId);
    this.revisionsItems.splice(indexItem, 1);

    const index = this.revisions.findIndex(rev => rev.reference === referenceId);
    this.revisions.splice(index, 1);

    return of(null);
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
