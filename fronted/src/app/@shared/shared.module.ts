import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSpinnerModule } from 'ngx-spinner';

import { PageNoFoundComponent } from './components/page-no-found/page-no-found.component';
import { LayoutModule } from '../@layout/layout.module';
import { ErrorMsgDirective } from './directives/error-msg.directive';
import { InputTextComponent } from './components/input-text/input-text.component';
import { ButtonsCreateComponent } from './components/buttons-create/buttons-create.component';
import { ButtonsUpdateComponent } from './components/buttons-update/buttons-update.component';
import { ButtonsViewComponent } from './components/buttons-view/buttons-view.component';


@NgModule({
  declarations: [
    PageNoFoundComponent,
    ErrorMsgDirective,
    InputTextComponent,
    ButtonsCreateComponent,
    ButtonsUpdateComponent,
    ButtonsViewComponent,
  ],
  exports: [
    PageNoFoundComponent,
    ErrorMsgDirective,
    TranslateModule,
    NgxSpinnerModule,
    Ng2SmartTableModule,
    InputTextComponent,
    ButtonsCreateComponent,
    ButtonsUpdateComponent,
    ButtonsViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    TranslateModule,
    NgxSpinnerModule,
    Ng2SmartTableModule
  ]
})
export class SharedModule { }
