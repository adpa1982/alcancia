import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ModValidaTipomonedaService {

  columnas = {
    id:     { title: 'Id',   type: 'number', sort: false, hide: true, filter: false },
    nombre: { title: 'Nombre', type: 'string', sort: false, hide: false }
  };

  constructor() { }


  campoNoValido(campo: string, form: FormGroup): boolean {
    return !form.get(campo)?.valid && form.get(campo)?.touched;
  }

  campoErrorMsg(campo: string, min: string, max: string, f: FormGroup): string {
    const errors = f.get(campo)?.errors;
    if (errors?.required) {
        return 'Campo requerido.';
    } else if ( errors?.minlength ) {
        return `El campo no puede contener menos de ${min} caracteres.`;
    } else if ( errors?.maxlength ) {
      return `El campo no puede contener mas de ${max} caracteres.`;
    }
    return '';
  }

  errorBackend(error: any, campo: string, f: FormGroup): string {
    if (error?.[campo] && f.status === 'INVALID' && f.get(campo).valid ) {
        return error[campo];
    }
    return '';
  }

  parameterSmartTable(): object {
    return {
      actions: {
        columnTitle: 'Actions',
        position: 'right',
        add: false,
        edit: false,
        delete: false,
        /*custom: [
          { name: 'viewrecord', title: `<i class="fas fa-eye ieye" title="Ver"></i>`, id: 'view' },
          { name: 'editrecord', title: `<i class="fas fa-pencil-alt ipencil" title="Editar"></i>`, id: 'edit' }
        ]*/
      },
      delete: {
        deleteButtonContent: '<i class="fas fa-trash-alt" title="Eliminar"></i>',
        confirmDelete: true,
      },
      columns: this.columnas,
      pager: {
        perPage: 10
      }
    };
  }

  compareObject(a: object, b: object): boolean {
    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();
    if (aKeys.length !== bKeys.length) {
        return false;
    }
    if (aKeys.join('') !== bKeys.join('')) {
        return false;
    }
    for (let i = 0; i < aKeys.length; i++) {
        if ( a[aKeys[i]] !== b[bKeys[i]]) {
            return false;
        }
    }
    return true;
  }
}
