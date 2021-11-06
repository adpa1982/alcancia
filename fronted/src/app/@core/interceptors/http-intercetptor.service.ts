import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SweetAlertService } from './../../@shared/utils/sweet-alert.service';


@Injectable({
  providedIn: 'root'
})
export class HttpIntercetptorService implements HttpInterceptor {

  constructor(private router: Router,
              private spinner: NgxSpinnerService,
              private alertSvc: SweetAlertService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    const reqClone = req.clone({ headers });

    return next.handle( reqClone )
              .pipe(
                  catchError( error  => {
                    let msgError: string;
                    if (error.status === 403) {
                        msgError = 'No tiene permisos para la opción seleccionada.';
                        this.alertSvc.error(msgError);
                    } else if (error.status === 500) {
                        console.log(error);
                        msgError = 'Se ha producido un error interno al procesar su solicitud, por favor intente nuevamente. Si el problema persiste, contacte al administrador del sistema.';
                        if (error.error) {
                            msgError = `${error.error.message} ${error.error.error}`;
                        }
                        this.alertSvc.error(msgError);
                    } else if (error.status === 503) {
                        msgError = 'No se puede encontrar una instancia del servicio, por favor intente nuevamente. Si el problema persiste, contacte al administrador del sistema.';
                        this.alertSvc.error(msgError);
                    } else if (error.status === 0) {
                        msgError = 'Error al relizar la petición al servicio.';
                        this.alertSvc.error(msgError);
                    }

                    this.spinner.hide();
                    // console.warn(error);
                    // console.log('Registrado en el log file');
                    // return of(error);
                    return throwError( error );
                  })
              );
  }

}
