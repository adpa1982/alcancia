import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alcancia } from 'src/app/@core/models/alcancia';
import { TipoMoneda } from 'src/app/@core/models/tipo-moneda';
import { AlcanciaService } from 'src/app/@core/services/alcancia.service';
import { TipomonedaService } from 'src/app/@core/services/tipomoneda.service';
import { ModValidaAlcanciaService } from 'src/app/@shared/utils/modules/mod-valida-alcancia.service';
import { SweetAlertService } from 'src/app/@shared/utils/sweet-alert.service';

@Component({
  selector: 'app-alcancia-create',
  templateUrl: './alcancia-create.component.html',
  styleUrls: ['./alcancia-create.component.css']
})
export class AlcanciaCreateComponent implements OnInit {

  public alcancia: Alcancia;
  public tipoMonedas: TipoMoneda[] =  [];
  public error: any;

  miFormulario: FormGroup = this.fb.group(
    {
      tipoMoneda: ['', [ Validators.required ] ],
    }
  );

  constructor(private fb: FormBuilder,
              private router: Router,
              private alcanciaSvc: AlcanciaService,
              private tipomonedaSvc: TipomonedaService,
              private alertSvc: SweetAlertService,
              private spinner: NgxSpinnerService,
              public  alcanciaValSvc: ModValidaAlcanciaService) { }

  ngOnInit(): void {
    this.allTipoMonedas();
  }

  allTipoMonedas(): void {
    this.tipomonedaSvc.allTipoMonedas()
      .subscribe(
          (res: any) => {
            this.tipoMonedas = res;
          },
          (err: any) => console.error(err)
      );
  }

  save(event: any): void {
    if (this.miFormulario.invalid)  {
        this.miFormulario.markAllAsTouched();
        return;
    }

    this.spinner.show();
    const nameModule = 'Modulo de alcancia';
    this.alcanciaSvc.save(this.miFormulario.value)
      .subscribe(
        res => {
          this.spinner.hide();
          const onCreate = 'Se guardo la moneda en la alcancia.';
          this.alertSvc.success(onCreate, nameModule)
              .then( (_) => {
                    const confirm = '¿Desea ingresar más monedas a la alcancia?.';
                    this.alertSvc.confirm(confirm).then(confirm => {
                      if (confirm) {
                        this.miFormulario.reset();
                      } else {
                        this.miFormulario.reset();
                        this.router.navigate(['/dashboard/alcancia/']);
                      }
                    });
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
                console.log('this.error');
                console.log(this.error);
                this.miFormulario.setErrors({ invalid: true });
            }
        }
      );
  }

}
