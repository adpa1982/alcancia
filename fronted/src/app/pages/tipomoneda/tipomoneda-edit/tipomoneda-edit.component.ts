import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlertService } from 'src/app/@shared/utils/sweet-alert.service';

import { TipoMoneda } from 'src/app/@core/models/tipo-moneda';
import { TipomonedaService } from 'src/app/@core/services/tipomoneda.service';
import { ModValidaTipomonedaService } from 'src/app/@shared/utils/modules/mod-valida-tipomoneda.service';

@Component({
  selector: 'app-tipomoneda-edit',
  templateUrl: './tipomoneda-edit.component.html',
  styleUrls: ['./tipomoneda-edit.component.css']
})
export class TipomonedaEditComponent implements OnInit {

  public tipomoneda: TipoMoneda;
  public error: any;


  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [null, [ Validators.required ] ],
    }
  );


  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private tipomonedaSvc: TipomonedaService,
              private alertSvc: SweetAlertService,
              private spinner: NgxSpinnerService,
              public  tipomonedaValSvc: ModValidaTipomonedaService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ( {id} ) => {
        this.view(id);
      });
  }

  public view(id: number): void {
    this.spinner.show();
    this.tipomonedaSvc.view(id)
      .subscribe(
        res => {
          this.spinner.hide();
          const { nombre,  } = res;
          this.tipomoneda = res;
          this.miFormulario.setValue({ nombre, });
        },
        err => {
          this.spinner.hide();
          const nameModule = 'Modulo de tipo de moneda';
          if (err.status === 404) {
              this.alertSvc.error(err.error, nameModule)
                .then( (_) => {
                  this.router.navigate(['/dashboard/tipomoneda/']);
              });
          }
        }
      );
  }

  update(event: any): void {
    if (this.miFormulario.invalid)  {
        this.miFormulario.markAllAsTouched();
        return;
    }

    const tipomonedaClone = this.cloneObject();
    const isUpdatable = this.tipomonedaValSvc.compareObject(this.miFormulario.value, tipomonedaClone);
    const nameModule = 'Modulo de tipo de moneda';
    if (isUpdatable) {
        const onNotModified = 'No se realizó ningún cambio en la información del tipo de moneda.';
        this.alertSvc.info(onNotModified, nameModule);
        return;
    }
    this.spinner.show();
    this.tipomonedaSvc.update(this.tipomoneda.id, this.miFormulario.value)
      .subscribe(
        res => {
          this.spinner.hide();
          const onModified = 'Se actualizó la información del tipo de moneda correctamente.';
          this.alertSvc.success(onModified, nameModule)
              .then( (_) => {
                    this.miFormulario.reset();
                    this.router.navigate(['/dashboard/tipomoneda/']);
              }
          );
        },
        err => {
            this.spinner.hide();
            if (err.status === 226) {
                this.alertSvc.error(err.error.text, nameModule);
            }
            if (err.status === 304) {
              const onNotModified = 'No se realizó ningún cambio en la información del tipo de moneda.';
                this.alertSvc.info(onNotModified, nameModule);
            }
            if (err.status === 400) {
                this.error = err.error;
                this.miFormulario.setErrors({ invalid: true });
            }
        }
      );
  }

  private cloneObject(): TipoMoneda {
    const tipomonedaClone = Object.assign( {} , this.tipomoneda);
    delete tipomonedaClone.id;
    delete tipomonedaClone.createdAt;
    delete tipomonedaClone.updatedAt;
    delete tipomonedaClone.deletedAt;
    return tipomonedaClone;
  }

}
