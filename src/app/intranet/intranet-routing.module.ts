import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Role} from '@core/role.model';
import {RoleGuardService} from '@core/role-guard.service';
import {IntranetComponent} from './intranet.component';

const routes: Routes = [
  {
    path: '', // 'intranet' to forRoot
    component: IntranetComponent,
    children: [ // or path: 'intranet/articles'
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule {
}
