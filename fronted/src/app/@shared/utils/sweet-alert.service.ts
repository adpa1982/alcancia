import { Injectable } from '@angular/core';
import swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  private alert(text: string, title: string = null, icon: any = null): Promise<SweetAlertResult<any>> {
    return swal.fire({
      title: title ? title : text,
      text: title ? text : null,
      icon,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  success(text: string, title: string = null): Promise<SweetAlertResult<any>> {
    return this.alert(text, title, 'success');
  }

  info(text: string, title: string = null): Promise<SweetAlertResult<any>> {
    return this.alert(text, title, 'info');
  }

  warning(text: string, title: string = null): Promise<SweetAlertResult<any>> {
    return this.alert(text, title, 'warning');
  }

  /**
   * @description
   *             this.alertService.error('No tiene permisos para la opción seleccionada').then(() => {
   *                this.auth.isLoggedIn() ? this.router.navigate(['/pages']) : this.router.navigate(['/login']);});
   * @param text: string
   * @param title: string
   */
  error(text: string = 'Error en el proceso.', title: string = null): Promise<SweetAlertResult<any>> {
    return Promise.resolve(
      swal
        .fire({
          width: '550 px',
          title,
          text,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
        .then(result => {
          return result.value;
        })
    );
  }

  /**
   * @description
   *             this.alertSvc.confirm("¿Seguro desea eliminar el archivo?")
   *                  .then((confirm) => { if (confirm) { this.alertSvc.info("Archivo Eliminado");}})
   * @param text: string
   * @param title: string
   * @param danger: boolean
   */
  confirm(text: string, title: string = 'Confirmación', danger: boolean = false): Promise<SweetAlertResult<any>> {
    return Promise.resolve(
      swal.fire({
        title,
        text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then(result => {
        return result.value;
      })
    );
  }


}
