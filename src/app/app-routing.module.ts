import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'inicio'},
  {path: 'inicio', loadChildren: () => import('./home/home.module').then(module => module.HomeModule)}, // lazy load
  {path: 'taller', loadChildren: () => import('./workshop/workshop.module').then(module => module.WorkshopModule)}, // lazy load
  {path: 'intranet', loadChildren: () => import('./intranet/intranet.module').then(module => module.IntranetModule)}, // lazy load
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
