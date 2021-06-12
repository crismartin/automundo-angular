import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';

import {MaterialModule} from '@shared/material.module';

import {CancelYesDialogComponent} from '@shared/dialogs/cancel-yes-dialog.component';
import {LoginDialogComponent} from '@shared/dialogs/login-dialog.component';

import {UppercaseWords} from '@shared/pipes/UppercaseWordsPipe';

import {CrudComponent} from '@shared/components/crud.component';
import {FooterComponent} from '@shared/components/footer.component';
import {ActiveElementPipe} from '@shared/pipes/ActiveElementPipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    FlexModule
  ],
  declarations: [
    CancelYesDialogComponent,
    CrudComponent,
    FooterComponent,
    LoginDialogComponent,
    UppercaseWords,
    ActiveElementPipe
  ],
  exports: [
    CancelYesDialogComponent,
    CommonModule,
    CrudComponent,
    FlexLayoutModule,
    FlexModule,
    FormsModule,
    FooterComponent,
    LoginDialogComponent,
    MaterialModule,
    UppercaseWords,
    ActiveElementPipe
  ],
  entryComponents: [
    CancelYesDialogComponent,
    LoginDialogComponent,
  ]
})
export class SharedModule {
}
