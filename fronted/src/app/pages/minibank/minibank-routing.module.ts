import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MinibankCreateComponent } from './minibank-create/minibank-create.component';
import { MinibankConsultarComponent } from './minibank-consultar/minibank-consultar.component';


const routes: Routes = [
  {
    path: '',
    component: MinibankConsultarComponent,
    data: { path: 'MiniBank', titulo: 'Listar ahorros' }
  },
  {
    path: 'agregar',
    component: MinibankCreateComponent,
    data: { path: 'MiniBank',  titulo: 'Agregar alcancía' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinibankRoutingModule { }
