import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Ejemplo } from './../../../@core/models/ejemplo';
import { EjemplosService } from 'src/app/@core/services/ejemplos.service';
import { SweetAlertService } from 'src/app/@shared/utils/sweet-alert.service';
import { ModValidaEjemploService } from 'src/app/@shared/utils/modules/mod-valida-ejemplo.service';


@Component({
  selector: 'app-ejemplo-edit',
  templateUrl: './ejemplo-edit.component.html',
  styleUrls: ['./ejemplo-edit.component.css']
})
export class EjemploEditComponent implements OnInit {

  public ejemplo: Ejemplo;
  public error: any;

  miFormulario: FormGroup = this.fb.group({
    codigo: [null, [ Validators.required, Validators.minLength(3)] ],
    nombre: [null, [ Validators.required, Validators.minLength(2)] ]
  });

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private ejemploSvc: EjemplosService,
              private alertSvc: SweetAlertService,
              public  ejeValSvs: ModValidaEjemploService) { }

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({id} ) => {
          this.view(id);
        });
  }

  public view(id: number): void {
    this.ejemploSvc.view(id)
      .subscribe(
        res => {
          const { codigo, nombre  } = res;
          this.ejemplo = res;
          this.miFormulario.setValue({ codigo, nombre });
        },
        err => {
          const nameModule = 'Modulo de ejemplo';
          if (err.status === 404) {
              this.alertSvc.error(err.error, nameModule);
              // this.router.navigate(['/dashboard/ejemplo/']);
          }
        }
      );
  }

  public update(event: any): void {
    if (this.miFormulario.invalid)  {
        this.miFormulario.markAllAsTouched();
        return;
    }

    const ejemploClone = this.cloneObject();
    const isUpdatable = this.ejeValSvs.compareObject(this.miFormulario.value, ejemploClone);
    const nameModule = 'Modulo de ejemplo';
    if (isUpdatable) {
        const onNotModified = 'No se realizó ningún cambio en la información del ejemplo.';
        this.alertSvc.info(onNotModified, nameModule);
        return;
    }

    this.ejemploSvc.update(this.ejemplo.id, this.miFormulario.value)
      .subscribe(
        res => {
          const onModified = 'Se actualizó la información del ejemplo correctamente.';
          this.alertSvc.success(onModified, nameModule)
              .then( (_) => {
                this.miFormulario.reset();
                this.router.navigate(['/dashboard/ejemplo/']);
              }
          );
        },
        err => {
          if (err.status === 226) {
              this.alertSvc.error(err.error.text, nameModule);
          }
          if (err.status === 304) {
              const onNotModified = 'No se realizó ningún cambio en la información del ejemplo.';
              this.alertSvc.info(onNotModified, nameModule);
          }
          if (err.status === 400) {
              this.error = err.error;
              this.miFormulario.setErrors({ invalid: true });
          }
        }
      );
  }

  private cloneObject(): Ejemplo {
    const ejemploClone = Object.assign( {} , this.ejemplo);
    delete ejemploClone.id;
    delete ejemploClone.createdAt;
    delete ejemploClone.updatedAt;
    delete ejemploClone.deletedAt;
    return ejemploClone;
  }

  /**
   * @description Metodo que obtiene los controles y sus propiedades
   * @fecha 2021-09-07
   * @autor Alberto Puche Algarin
   */
  get f(): any {
    return this.miFormulario.controls;
  }

}
