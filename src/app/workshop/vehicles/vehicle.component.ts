import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../shared/services/models/vehicle.model';
import {VehicleService} from './vehicle.service';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {RevisionService} from '../revisions/revision.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent {
  vehicleModel: Vehicle;
  titleRevisions = 'Historial de revisiones';
  revisions = of([]);

  constructor(private vehicleService: VehicleService, private activatedRoute: ActivatedRoute, private revisionService: RevisionService) {
    this.activatedRoute.paramMap.subscribe(params => {
      const idVehicle = params.get('idVehicle');
      this.vehicleService.search(idVehicle)
        .subscribe((vehicle) => {
          this.vehicleModel = vehicle;
          this.revisions = this.revisionService.search(vehicle.referenceId);
        });
    });
  }

  createRevision(): void {

  }

  printInvoice($event: any): void {

  }

  updateRevision($event: any): void {

  }

  deleteRevision($event: any): void {

  }
}
