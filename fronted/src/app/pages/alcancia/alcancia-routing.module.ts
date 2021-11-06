import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlcanciaCreateComponent } from './alcancia-create/alcancia-create.component';
import { AlcanciaEditComponent } from './alcancia-edit/alcancia-edit.component';
import { AlcanciaListComponent } from './alcancia-list/alcancia-list.component';
import { AlcanciaViewComponent } from './alcancia-view/alcancia-view.component';

const routes: Routes = [
  {
    path: '',
    component: AlcanciaListComponent,
    data: { path: 'Alcancía', titulo: 'Listar ahorro' }
  },
  {
    path: 'agregar',
    component: AlcanciaCreateComponent,
    data: { path: 'Alcancía',  titulo: 'Agregar alcancía' }
  },
  {
    path: 'consultar',
    component: AlcanciaEditComponent,
    data: { path: 'Alcancía', titulo: 'Consultar alcancía' }
  },
  {
    path: 'total',
    component: AlcanciaViewComponent,
    data: { path: 'Alcancía', titulo: 'Totales de la alcancía' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlcanciaRoutingModule { }
