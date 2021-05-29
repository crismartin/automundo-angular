import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CoreModule} from '@core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { FinderVehiclesComponent } from './workshop/finder-vehicles/finder-vehicles.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { CustomerComponent } from './workshop/customers/customer.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    SharedModule,
    // HomeModule // eager load
    // IntranetModule // eager load
  ],
  declarations: [
    AppComponent,
    CustomerComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
