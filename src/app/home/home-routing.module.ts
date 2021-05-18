import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdviserComponent} from './adviser/adviser.component';
import {HomeComponent} from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'adviser', component: AdviserComponent}, // public
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
