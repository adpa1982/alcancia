import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlertService } from 'src/app/@shared/utils/sweet-alert.service';

import { TipomonedaService } from 'src/app/@core/services/tipomoneda.service';
import { ModValidaTipomonedaService } from 'src/app/@shared/utils/modules/mod-valida-tipomoneda.service';

@Component({
  selector: 'app-tipomoneda-create',
  templateUrl: './tipomoneda-create.component.html',
  styleUrls: ['./tipomoneda-create.component.css']
})
export class TipomonedaCreateComponent implements OnInit {

  public tipomoneda: TipomonedaCreateComponent;
  public error: any;

  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [null, [ Validators.required, Validators.minLength(2), Validators.maxLength(4) ] ],
    }
  );

  constructor(private fb: FormBuilder,
              private router: Router,
              private tipomonedaSvc: TipomonedaService,
              private alertSvc: SweetAlertService,
              private spinner: NgxSpinnerService,
              public  tipomonedaValSvc: ModValidaTipomonedaService) { }

  ngOnInit(): void {  }

  save(event: any): void {
    if (this.miFormulario.invalid)  {
        this.miFormulario.markAllAsTouched();
        return;
    }
    this.spinner.show();
    const nameModule = 'Modulo de tipo de moneda';
    this.tipomonedaSvc.save(this.miFormulario.value)
      .subscribe(
        res => {
          this.spinner.hide();
          const onCreate = 'Se guardo la información del tipo de moneda correctamente.';
          this.alertSvc.success(onCreate, nameModule)
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
            if (err.status === 400) {
                this.error = err.error;
                this.miFormulario.setErrors({ invalid: true });
            }
            if (err.status === 501) {
                const unique = `Ya existe un ${err.error.key} de del tipo de moneda registrado anteriormente.`;
                this.alertSvc.error(unique, nameModule);
            }
        }
      );
  }

}
