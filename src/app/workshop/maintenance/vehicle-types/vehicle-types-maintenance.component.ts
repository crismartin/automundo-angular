import { Component, OnInit } from '@angular/core';
import {of} from 'rxjs';
import {VehicleTypeSearch} from '../../shared/services/models/vehicle-type-search.model';
import {MatDialog} from '@angular/material/dialog';

import {VehicleTypeService} from './vehicle-type.service';
import {VehicleTypeDialogComponent} from './vehicle-type-dialog/vehicle-type-dialog.component';
import {CancelYesDialogComponent} from '@shared/dialogs/cancel-yes-dialog.component';
import {VehicleType} from '../../shared/services/models/vehicle-type';

@Component({
  selector: 'app-vehicle-types-maintenance',
  templateUrl: './vehicle-types-maintenance.component.html',
  styleUrls: ['./vehicle-types-maintenance.component.css']
})
export class VehicleTypesMaintenanceComponent implements OnInit {

  vehicleTypeSearch: VehicleTypeSearch;
  vehicleTypes = of([]);
  title = 'Tipos de vehículo';

  constructor(private vehicleTypeService: VehicleTypeService, private dialog: MatDialog) {
    this.resetSearch();
  }

  ngOnInit(): void {
  }

  search(): void {
    this.vehicleTypes = this.vehicleTypeService.search(this.vehicleTypeSearch);
  }

  resetSearch(): void {
    this.vehicleTypeSearch = {
      active: true
    };
  }

  update(vehicleType: VehicleType): void {
    this.vehicleTypeService.read(vehicleType.reference)
      .subscribe(vehicleTypeReaded => this.dialog
        .open(VehicleTypeDialogComponent, {data: vehicleTypeReaded})
        .afterClosed()
        .subscribe(() => this.search()));
  }

  newVehicleType(): void {
    this.dialog
      .open(VehicleTypeDialogComponent)
      .afterClosed()
      .subscribe(() => this.search());
  }
}
