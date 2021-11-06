import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from 'src/app/@shared/shared.module';

import { AlcanciaRoutingModule } from './alcancia-routing.module';
import { AlcanciaCreateComponent } from './alcancia-create/alcancia-create.component';
import { AlcanciaListComponent } from './alcancia-list/alcancia-list.component';
import { AlcanciaViewComponent } from './alcancia-view/alcancia-view.component';
import { AlcanciaEditComponent } from './alcancia-edit/alcancia-edit.component';


@NgModule({
  declarations: [
    AlcanciaCreateComponent,
    AlcanciaListComponent,
    AlcanciaViewComponent,
    AlcanciaEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    HttpClientModule,
    SharedModule,
    AlcanciaRoutingModule
  ]
})
export class AlcanciaModule { }
