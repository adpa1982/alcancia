import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Ejemplo } from './../../../@core/models/ejemplo';
import { EjemplosService } from 'src/app/@core/services/ejemplos.service';
import { SweetAlertService } from 'src/app/@shared/utils/sweet-alert.service';
import { ModValidaEjemploService } from 'src/app/@shared/utils/modules/mod-valida-ejemplo.service';

@Component({
  selector: 'app-ejemplo-create',
  templateUrl: './ejemplo-create.component.html',
  styleUrls: ['./ejemplo-create.component.css']
})
export class EjemploCreateComponent implements OnInit {

  public ejemplo: Ejemplo;
  public error: any;

  miFormulario: FormGroup = this.fb.group(
    {
      codigo: [null, [ Validators.required, Validators.minLength(3) ] ],
      nombre: [null, [ Validators.required, Validators.minLength(3)] ]
    }
  );

  constructor(private fb: FormBuilder,
              private router: Router,
              private ejemploSvc: EjemplosService,
              private alertSvc: SweetAlertService,
              public  ejeValSvs: ModValidaEjemploService) { }

  ngOnInit(): void { }

  save(event: any): void {
    if (this.miFormulario.invalid)  {
        this.miFormulario.markAllAsTouched();
        return;
    }
    const nameModule = 'Modulo de ejemplo';
    this.ejemploSvc.save(this.miFormulario.value)
      .subscribe(
        res => {
          const onCreate = 'Se guardo la información del ejemplo correctamente.';
          this.alertSvc.success(onCreate, nameModule)
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
          if (err.status === 400) {
              this.error = err.error;
              this.miFormulario.setErrors({ invalid: true });
          }
        }
      );
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
