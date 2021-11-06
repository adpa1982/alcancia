import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipomonedaCreateComponent } from './tipomoneda-create/tipomoneda-create.component';
import { TipomonedaEditComponent } from './tipomoneda-edit/tipomoneda-edit.component';
import { TipomonedaListComponent } from './tipomoneda-list/tipomoneda-list.component';
import { TipomonedaViewComponent } from './tipomoneda-view/tipomoneda-view.component';

const routes: Routes = [
  {
    path: '',
    component: TipomonedaListComponent,
    data: { path: 'TipoMoneda', titulo: 'Listar Tipo de Monedas' }
  },
  {
    path: 'create',
    component: TipomonedaCreateComponent,
    data: { path: 'TipoMoneda',  titulo: 'Crear Tipo de Moneda' }
  },
  {
    path: 'edit/:id',
    component: TipomonedaEditComponent,
    data: { path: 'TipoMoneda', titulo: 'Editar Tipo de Moneda' }
  },
  {
    path: 'view/:id',
    component: TipomonedaViewComponent,
    data: { path: 'TipoMoneda', titulo: 'Ver Tipo de Moneda' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipomonedaRoutingModule { }
