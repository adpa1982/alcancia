
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { path: 'Home', titulo: 'Dashboard' } },
  {
    path: 'ejemplo',
    loadChildren: () => import('./ejemplo/ejemplo.module').then( m => m.EjemploModule )
  },
  {
    path: 'tipomoneda',
    loadChildren: () => import('./tipoMoneda/tipoMoneda.module').then( m => m.TipomonedaModule )
  },
  {
    path: 'alcancia',
    loadChildren: () => import('./alcancia/alcancia.module').then( m => m.AlcanciaModule )
  },
  {
    path: 'minibank',
    loadChildren: () => import('./minibank/minibank.module').then( m => m.MinibankModule )
  }
];

@NgModule({
    imports: [ RouterModule.forChild(childRoutes) ],
    exports: [ RouterModule ]
  })
  export class ChildRoutesModule { }
