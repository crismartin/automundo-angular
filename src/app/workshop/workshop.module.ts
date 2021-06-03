import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FinderVehiclesComponent} from './finder-vehicles/finder-vehicles.component';
import {SharedModule} from '@shared/shared.module';
import { FinderCustomersComponent } from './finder-customers/finder-customers.component';
import { CustomerDialogComponent } from './customers/customer-dialog/customer-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import { VehicleDialogComponent } from './vehicles/vehicle-dialog/vehicle-dialog.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ReplacementsMaintenanceComponent } from './maintenance/replacements/replacements-maintenance.component';
import { ReplacementDialogComponent } from './maintenance/replacements/replacement-dialog/replacement-dialog.component';
import { VehicleComponent } from './vehicles/vehicle.component';

@NgModule({
  declarations: [
    FinderVehiclesComponent,
    FinderCustomersComponent,
    CustomerDialogComponent,
    VehicleDialogComponent,
    MaintenanceComponent,
    ReplacementsMaintenanceComponent,
    ReplacementDialogComponent,
    VehicleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class WorkshopModule { }
