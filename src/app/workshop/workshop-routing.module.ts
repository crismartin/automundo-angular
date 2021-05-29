import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Role} from '@core/role.model';
import {RoleGuardService} from '@core/role-guard.service';
import {WorkshopComponent} from './workshop.component';
import {FinderVehiclesComponent} from './finder-vehicles/finder-vehicles.component';
import {MainMenuComponent} from './main-menu/main-menu.component';


const routes: Routes = [
  {
    path: '',
    component: WorkshopComponent,
//    canActivate: [RoleGuardService],
//    data: {roles: [Role.ADMIN, Role.MANAGER, Role.OPERATOR]},
    children: [
      {path: 'menu', component: MainMenuComponent},
      {path: 'buscar-vehiculos', component: FinderVehiclesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule {
}
