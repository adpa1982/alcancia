import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from 'src/app/@shared/shared.module';

import { TipomonedaRoutingModule } from './tipomoneda-routing.module';
import { TipomonedaCreateComponent } from './tipomoneda-create/tipomoneda-create.component';
import { TipomonedaListComponent } from './tipomoneda-list/tipomoneda-list.component';
import { TipomonedaViewComponent } from './tipomoneda-view/tipomoneda-view.component';
import { TipomonedaEditComponent } from './tipomoneda-edit/tipomoneda-edit.component';


@NgModule({
  declarations: [
    TipomonedaCreateComponent,
    TipomonedaListComponent,
    TipomonedaViewComponent,
    TipomonedaEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    HttpClientModule,
    SharedModule,
    TipomonedaRoutingModule
  ]
})
export class TipomonedaModule { }
