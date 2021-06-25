import { Component, OnInit } from '@angular/core';
import {VehicleService} from './vehicle.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import {RevisionService} from '../revisions/revision.service';
import {MatDialog} from '@angular/material/dialog';
import {RevisionDialogComponent} from '../revisions/revision-dialog/revision-dialog.component';
import {Revision} from '../shared/services/models/revision';
import {Vehicle} from '../shared/services/models/vehicle.model';
import {CancelYesDialogComponent} from '@shared/dialogs/cancel-yes-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicleModel: Vehicle = {
    vehicleType: {
      reference: '',
      name: ''
    }
  };
  titleRevisions = 'Historial de revisiones';
  revisions = of([]);

  constructor(private vehicleService: VehicleService, private activatedRoute: ActivatedRoute,
              private revisionService: RevisionService, private dialog: MatDialog, private snackBar: MatSnackBar) {
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
        disableClose: true,
        data: {
          vehicleReference: this.vehicleModel.reference
        }
      })
      .afterClosed()
      .subscribe(() => this.searchRevisions());
  }

  printInvoice(revision: Revision): void {
    this.revisionService.printPdf(revision.reference)
      .subscribe(value => value);
  }

  updateRevision(revision: Revision): void {
    this.revisionService.read(revision.reference)
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
    const dialogTitle = 'Dar de baja';
    const dialogText = '¿Realmente desea dar de baja la Revisión?';
    this.dialog.open(CancelYesDialogComponent, {data: {title: dialogTitle, text: dialogText}}).afterClosed().subscribe(
      result => {
        if (result) {
          this.revisionService.delete(revision.reference).subscribe(
            () => {
              this.snackBar.open('Revisión eliminada correctamente', '', {
                duration: 3500
              });
              this.searchRevisions();
            }
          );
        }
      }
    );
  }
}
