import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from 'src/app/@shared/shared.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { EjemploRoutingModule } from './ejemplo-routing.module';
import { EjemploCreateComponent } from './ejemplo-create/ejemplo-create.component';
import { EjemploListComponent } from './ejemplo-list/ejemplo-list.component';
import { EjemploViewComponent } from './ejemplo-view/ejemplo-view.component';
import { EjemploEditComponent } from './ejemplo-edit/ejemplo-edit.component';


@NgModule({
  declarations: [
    EjemploCreateComponent,
    EjemploListComponent,
    EjemploViewComponent,
    EjemploEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EjemploRoutingModule,
    Ng2SmartTableModule,
    HttpClientModule,
    SharedModule
  ]
})
export class EjemploModule { }
