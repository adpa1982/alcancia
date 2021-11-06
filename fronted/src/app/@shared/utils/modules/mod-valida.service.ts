import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ModValidaService {


  constructor() { }

  campoNoValido(campo: string, form: FormGroup): boolean {
    return !form.get(campo)?.valid && form.get(campo)?.touched;
  }

  /**
   * @Description Validacion del campo tema
   * @param campo: string
   * @param f: FormGroup
   * @returns string
   */
  temaErrorMsg(campo: string, f: FormGroup): string {
    const errors = f.get(campo)?.errors;
    if (errors?.required) {
        return 'Campo requerido.';
    } else if ( errors?.pattern ) {
        return 'Formato de caracteres inválido, solo se aceptan letras.';
    } else if ( errors?.minlength ) {
        return `El campo no puede contener menos de 6 caracteres.`;
    }
    return '';
  }

  /**
   * @Description Validacion del campo email
   * @param campo: string
   * @param f: FormGroup
   * @returns string
   */
  emailErrorMsg(campo: string, f: FormGroup): string {
    const errors = f.get(campo)?.errors;
    if (errors?.required) {
        return 'Campo requerido.';
    } else if ( errors?.pattern ) {
        return 'Formato de e-mail inválido.';
    } else if ( errors?.emailTomado ) {
        return 'El email ya fues registrado anteriormente.';
    }
    return '';
  }


  /**
   * @description Campo no puede ser strider
   * @param control: AbstractControl
   * @returns null
   */
  noPuedeSerStrider( control: AbstractControl ): ValidationErrors | null {
    const valor = control.value?.trim().toLowerCase();
    if ( valor === 'strider' ) {
        // Hay error
        return { noStrider: true };
    }
    // No hay error
    return null;
  }

  camposIguales( campo1: string, campo2: string ): ValidationErrors | null {
    return ( formControl: AbstractControl ): ValidationErrors | null => {
      const pass1 = formControl.get(campo1).value;
      const pass2 = formControl.get(campo2).value;
      if ( pass1 !== pass2 ) {
          formControl.get(campo2)?.setErrors({ noIguales: true });
          return { noIguales: true };
      }
      formControl.get(campo2)?.setErrors(null);
      return null;
    };
  }

}
