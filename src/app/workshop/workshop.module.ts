import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FinderVehiclesComponent} from './finder-vehicles/finder-vehicles.component';
import {WorkshopComponent} from './workshop.component';
import {WorkshopRoutingModule} from './workshop-routing.module';
import {SharedModule} from '@shared/shared.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FinderCustomersComponent } from './finder-customers/finder-customers.component';
import { CustomerDialogComponent } from './customers/customer-dialog/customer-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import { VehicleDialogComponent } from './vehicles/vehicle-dialog/vehicle-dialog.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ReplacementsMaintenanceComponent } from './maintenance/replacements/replacements-maintenance.component';
import { ReplacementDialogComponent } from './maintenance/replacements/replacement-dialog/replacement-dialog.component';

@NgModule({
  declarations: [
    WorkshopComponent,
    FinderVehiclesComponent,
    MainMenuComponent,
    FinderCustomersComponent,
    CustomerDialogComponent,
    VehicleDialogComponent,
    MaintenanceComponent,
    ReplacementsMaintenanceComponent,
    ReplacementDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    WorkshopRoutingModule,
    ReactiveFormsModule
  ]
})
export class WorkshopModule { }
