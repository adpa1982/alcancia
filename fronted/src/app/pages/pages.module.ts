import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modulos Propios
import { LayoutModule } from '../@layout/layout.module';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../@shared/shared.module';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    SharedModule
  ]
})
export class PagesModule { }
