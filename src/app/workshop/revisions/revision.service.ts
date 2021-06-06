import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Revision} from '../shared/services/models/revision';
import {Vehicle} from '../shared/services/models/vehicle.model';
import {RevisionItem} from '../shared/services/models/revision-item';
import {Technician} from '../shared/services/models/technician';
import {StatusRevision} from '../shared/services/models/status-revision';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {
  revisionsItems: RevisionItem[] = [
    {
      referenceId: '1',
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
      referenceId: '1',
      completeName: 'Jose Luis Señor'
    },
    {
      referenceId: '2',
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

  revisions: Revision[] = [
    {
      referenceId: '1',
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
      }
    }
  ];

  constructor() { }

  search(idVehicle: string): Observable<RevisionItem[]> {
    return of(this.revisionsItems);
  }

  create(revision: Revision): Observable<Revision> {
    revision.referenceId = getIdGenerate();
    revision.status = {
      code: 1,
      description: 'POR_CONFIRMAR'
    };
    this.revisions.push(revision);
    const revisionItem = toRevisionItem(revision);
    this.revisionsItems.push(revisionItem);
    return of(revisionItem);
  }

  read(referenceId: string): Observable<Revision> {
    const revision = this.revisions.find(revisionArray => revisionArray.referenceId === referenceId);
    return of(revision);
  }

  update(revisionUpdated: Revision): Observable<RevisionItem> {
    const revision = this.revisions.find(revisionArray => revisionArray.referenceId === revisionUpdated.referenceId);
    revision.diagnostic = revisionUpdated.diagnostic;
    revision.registerDate = revisionUpdated.registerDate;
    revision.initialKilometers = revisionUpdated.initialKilometers;
    revision.technician = this.technicians.find(technician => technician.referenceId === revisionUpdated.technician.referenceId );
    revision.workedHours = revisionUpdated.workedHours;
    revision.departureDate = revisionUpdated.departureDate;
    revision.departureKilometers = revisionUpdated.departureKilometers;
    revision.workDescription = revisionUpdated.workDescription;
    revision.status = this.statusRevision.find(statusArray => String(statusArray.code) === String(revisionUpdated.status.code));

    const revisionItem = this.revisionsItems.find(revisionArray => revisionArray.referenceId === revisionUpdated.referenceId);
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
    const indexItem = this.revisionsItems.findIndex(revItem => revItem.referenceId === referenceId);
    this.revisionsItems.splice(indexItem, 1);

    const index = this.revisions.findIndex(rev => rev.referenceId === referenceId);
    this.revisions.splice(index, 1);

    return of(null);
  }
}

function getIdGenerate(): string {
  return Math.random().toString(36).substr(2, 9);
}

function toRevisionItem(revision: Revision): RevisionItem {
  const revisionItem: RevisionItem = {
    referenceId: revision.referenceId,
    diagnostic: revision.diagnostic,
    registerDate: revision.registerDate,
    departureDate: revision.departureDate,
    technicianName: revision.technician.completeName,
    statusName: revision.status.description
  };
  return revisionItem;
}
