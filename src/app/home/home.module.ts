import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  entryComponents: [
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
  ],
  providers: [
  ]
})
export class HomeModule {

}
