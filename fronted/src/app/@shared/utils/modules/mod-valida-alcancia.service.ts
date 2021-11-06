import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ModValidaAlcanciaService {

  columnas = {
    id: { title: 'id',  type: 'number', sort: false, hide: true, filter: false },
    tipoMoneda:   { title: 'Tipo de moneda', type: 'number', sort: false, hide: false,
              valuePrepareFunction: (tipoMoneda: any) =>  tipoMoneda.nombre,
              filter: false
            },
    createdAt: { title: 'Guardado',  type: 'string', sort: false, hide: false, filter: false,
                 valuePrepareFunction: (createdAt: any) =>  this.convertirFecha(createdAt),
                }
  }

  constructor() {}

  campoNoValido(campo: string, form: FormGroup): boolean {
    return !form.get(campo)?.valid && form.get(campo)?.touched;
  }

  convertirFecha(fecha: string) {
    let date = new Date(fecha);
    let formatted = moment(date).format('YYYY-MM-DD HH:mm');
    return  formatted;
  }

  campoErrorMsg(campo: string, f: FormGroup): string {
    const errors = f.get(campo)?.errors;
    if (errors?.required) {
        return 'Campo requerido.';
    }
    return '';
  }

  errorBackend(error: any, campo: string, f: FormGroup): string {
    if (error?.[campo] && f.status === 'INVALID' && f.get(campo).valid ) {
        return error[campo];
    }
    return '';
  }

  compararObject(a1: any, a2: any): boolean {
    if (a1 === undefined && a2 === undefined) {
        return true;
    }
    return (a1 === null || a2 === null || a1 === undefined || a2 === undefined) ? false : a1.id === a2.id;
  }

  parameterSmartTable(): object {
    return {
      actions: {
        columnTitle: 'Actions',
        position: 'right',
        add: false,
        edit: false,
        delete: false,
      },
      columns: this.columnas,
      pager: {
        perPage: 10
      }
    };
  }

}
