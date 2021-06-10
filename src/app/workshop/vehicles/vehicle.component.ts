import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../shared/services/models/vehicle.model';
import {VehicleService} from './vehicle.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import {RevisionService} from '../revisions/revision.service';
import {MatDialog} from '@angular/material/dialog';
import {VehicleDialogComponent} from './vehicle-dialog/vehicle-dialog.component';
import {RevisionDialogComponent} from '../revisions/revision-dialog/revision-dialog.component';
import {Revision} from '../shared/services/models/revision';
import {ReplacementsService} from '../replacements/replacements-service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicleModel: any = {};
  titleRevisions = 'Historial de revisiones';
  revisions = of([]);

  constructor(private vehicleService: VehicleService, private activatedRoute: ActivatedRoute,
              private revisionService: RevisionService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const idVehicle = params.get('id');
      this.vehicleService.search(idVehicle)
        .subscribe(vehicleSearched => {
          this.vehicleModel = vehicleSearched;
          this.searchRevisions();
        });
    });
  }

  searchRevisions(): void{
    this.revisions = this.revisionService.search(this.vehicleModel.reference);
  }

  createRevision(): void {
    this.dialog
      .open(RevisionDialogComponent, {
        height: '500px',
        width: '800px',
        disableClose: true
      })
      .afterClosed()
      .subscribe(() => this.searchRevisions());
  }

  printInvoice(revision: Revision): void {

  }

  updateRevision(revision: Revision): void {
    this.revisionService.read(revision.referenceId)
      .subscribe(revisionSearched => this.dialog.open(RevisionDialogComponent, {
            height: '500px',
            width: '800px',
            data: revisionSearched,
            disableClose: true
          })
        .afterClosed()
        .subscribe(() => this.searchRevisions())
      );
  }

  deleteRevision(revision: Revision): void {
    this.revisionService.delete(revision.referenceId)
      .subscribe(() => this.searchRevisions());
  }
}
