import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';

import {IntranetComponent} from './intranet.component';
import {IntranetRoutingModule} from './intranet-routing.module';

@NgModule({
  declarations: [
    IntranetComponent,
  ],
  entryComponents: [
  ],
  imports: [
    SharedModule,
    IntranetRoutingModule,
  ],
  providers: [
  ],
})
export class IntranetModule {

}
