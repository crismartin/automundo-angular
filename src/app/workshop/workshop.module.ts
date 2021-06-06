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
import { VehicleTypesMaintenanceComponent } from './maintenance/vehicle-types/vehicle-types-maintenance.component';
import { VehicleTypeDialogComponent } from './maintenance/vehicle-types/vehicle-type-dialog/vehicle-type-dialog.component';
import { RevisionDialogComponent } from './revisions/revision-dialog/revision-dialog.component';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';

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
    VehicleTypesMaintenanceComponent,
    VehicleTypeDialogComponent,
    RevisionDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule
  ]
})
export class WorkshopModule { }
