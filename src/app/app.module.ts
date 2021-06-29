import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CoreModule} from '@core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CustomerComponent} from './workshop/customers/customer.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from '@shared/shared.module';
import {HomeComponent} from './home/home.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {WorkshopComponent} from './workshop/workshop.component';
import {WorkshopModule} from './workshop/workshop.module';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE} from '@angular/material/core';

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
    MatGridListModule,
    WorkshopModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  declarations: [
    AppComponent,
    CustomerComponent,
    HomeComponent,
    WorkshopComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
    ]
})
export class AppModule {
}
