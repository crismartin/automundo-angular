import { Component, OnInit } from '@angular/core';
import {of} from 'rxjs';
import {VehicleTypeSearch} from './vehicle-type-search.model';
import {MatDialog} from '@angular/material/dialog';
import {VehicleType} from './vehicle-type.model';
import {VehicleTypeService} from './vehicle-type.service';
import {VehicleTypeDialogComponent} from './vehicle-type-dialog/vehicle-type-dialog.component';

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
    this.vehicleTypeSearch = {};
  }

  update(vehicleType: VehicleType): void {
    this.vehicleTypeService.read(vehicleType.reference)
      .subscribe(vehicleTypeReaded => this.dialog
        .open(VehicleTypeDialogComponent, {data: vehicleTypeReaded})
        .afterClosed()
        .subscribe(() => this.search()));
  }

  delete($event: any) {

  }

  newVehicleType(): void {
    this.dialog
      .open(VehicleTypeDialogComponent)
      .afterClosed()
      .subscribe(() => this.search());
  }
}
