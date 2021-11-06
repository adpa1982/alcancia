import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EjemploCreateComponent } from './ejemplo-create/ejemplo-create.component';
import { EjemploEditComponent } from './ejemplo-edit/ejemplo-edit.component';
import { EjemploListComponent } from './ejemplo-list/ejemplo-list.component';
import { EjemploViewComponent } from './ejemplo-view/ejemplo-view.component';

const routes: Routes = [
  {
    path: '',
    component: EjemploListComponent,
    data: { path: 'Ejemplo', titulo: 'Listar ejemplos' }
  },
  {
    path: 'create',
    component: EjemploCreateComponent,
    data: { path: 'Ejemplo',  titulo: 'Crear ejemplo' }
  },
  {
    path: 'edit/:id',
    component: EjemploEditComponent,
    data: { path: 'Ejemplo', titulo: 'Editar ejemplo' }
  },
  {
    path: 'view/:id',
    component: EjemploViewComponent,
    data: { path: 'Ejemplo', titulo: 'Ver ejemplo' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjemploRoutingModule { }
