import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from 'src/app/@shared/shared.module';

import { MinibankRoutingModule } from './minibank-routing.module';
import { MinibankCreateComponent } from './minibank-create/minibank-create.component';
import { MinibankConsultarComponent } from './minibank-consultar/minibank-consultar.component';



@NgModule({
  declarations: [
    MinibankCreateComponent,
    MinibankConsultarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    HttpClientModule,
    SharedModule,
    MinibankRoutingModule
  ]
})
export class MinibankModule { }
