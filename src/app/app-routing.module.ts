import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {IntranetComponent} from './intranet/intranet.component';
import {WorkshopComponent} from './workshop/workshop.component';
import {FinderVehiclesComponent} from './workshop/finder-vehicles/finder-vehicles.component';
import {CustomerComponent} from './workshop/customers/customer.component';
import {FinderCustomersComponent} from './workshop/finder-customers/finder-customers.component';
import {MaintenanceComponent} from './workshop/maintenance/maintenance.component';
import {ReplacementsMaintenanceComponent} from './workshop/maintenance/replacements/replacements-maintenance.component';
import {VehicleTypesMaintenanceComponent} from './workshop/maintenance/vehicle-types/vehicle-types-maintenance.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'inicio'},
  {path: 'inicio', component: HomeComponent},
  {path: 'taller',
//    canActivate: [RoleGuardService],
//    data: {roles: [Role.ADMIN, Role.OPERATOR]},
    children: [
      {path: '', component: WorkshopComponent},
      {path: 'buscar-vehiculos', component: FinderVehiclesComponent},
      {path: 'buscar-clientes', component: FinderCustomersComponent},
      {path: 'mantenimiento',
        children: [
          {path: '', component: MaintenanceComponent},
          {path: 'repuestos', component: ReplacementsMaintenanceComponent},
          {path: 'tipos-vehiculo', component: VehicleTypesMaintenanceComponent},
        ]},
      {path: 'cliente/:id', component: CustomerComponent},
    ]
    },
  {path: 'intranet', component: IntranetComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

