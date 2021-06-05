import { Component, OnInit } from '@angular/core';
import {of} from 'rxjs';
import {VehicleTypeSearch} from './vehicle-type-search.model';
import {MatDialog} from '@angular/material/dialog';
import {VehicleType} from './vehicle-type.model';
import {VehicleTypeService} from './vehicle-type.service';
import {VehicleTypeDialogComponent} from './vehicle-type-dialog/vehicle-type-dialog.component';
import {Replacement} from '../replacements/replacement.model';
import {CancelYesDialogComponent} from '@shared/dialogs/cancel-yes-dialog.component';

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

  delete(vehicleType: VehicleType): void {
    const dialogTitle = 'Eliminar';
    const dialogText = '¿Realmente desea eliminar el tipo de vehículo: ' + vehicleType.name + '?';
    this.dialog.open(CancelYesDialogComponent, {data: {title: dialogTitle, text: dialogText}}).afterClosed().subscribe(
      result => {
        if (result) {
          this.vehicleTypeService.delete(vehicleType.reference).subscribe(
            () => this.search()
          );
        }
      }
    );
  }

  newVehicleType(): void {
    this.dialog
      .open(VehicleTypeDialogComponent)
      .afterClosed()
      .subscribe(() => this.search());
  }
}
