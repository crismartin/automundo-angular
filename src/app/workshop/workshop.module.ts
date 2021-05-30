import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FinderVehiclesComponent} from './finder-vehicles/finder-vehicles.component';
import {WorkshopComponent} from './workshop.component';
import {WorkshopRoutingModule} from './workshop-routing.module';
import {SharedModule} from '@shared/shared.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FinderCustomersComponent } from './finder-customers/finder-customers.component';

@NgModule({
  declarations: [
    WorkshopComponent,
    FinderVehiclesComponent,
    MainMenuComponent,
    FinderCustomersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    WorkshopRoutingModule
  ]
})
export class WorkshopModule { }
