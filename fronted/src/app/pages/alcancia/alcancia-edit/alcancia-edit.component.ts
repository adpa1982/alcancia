import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';
import { Alcancia } from 'src/app/@core/models/alcancia';
import { TipoMoneda } from 'src/app/@core/models/tipo-moneda';
import { AlcanciaService } from 'src/app/@core/services/alcancia.service';
import { TipomonedaService } from 'src/app/@core/services/tipomoneda.service';
import { ModValidaAlcanciaService } from 'src/app/@shared/utils/modules/mod-valida-alcancia.service';
import { SweetAlertService } from 'src/app/@shared/utils/sweet-alert.service';

@Component({
  selector: 'app-alcancia-edit',
  templateUrl: './alcancia-edit.component.html',
  styleUrls: ['./alcancia-edit.component.css']
})
export class AlcanciaEditComponent implements OnInit {

  public alcancia: Alcancia;
  public tipoMonedas: TipoMoneda[] =  [];
  public error: any;
  public moneda: number;
  public cantidad: number;
  public valor: number;
  public bool: boolean;


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
    this.bool = false;

    this.miFormulario.get('tipoMoneda')?.valueChanges
      .subscribe(value => {
        this.bool = false;
      });



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


  consultar(event: any): void {
    if (this.miFormulario.invalid)  {
        this.miFormulario.markAllAsTouched();
        return;
    }

    const nameModule = 'Modulo de alcancía';
    let id = this.miFormulario.get('tipoMoneda').value.id;
    let nombre = this.miFormulario.get('tipoMoneda').value.nombre;

    this.alcanciaSvc.cantidad(id)
      .subscribe(
        res => {
          this.spinner.hide();
          this.moneda = nombre;
          this.bool = true;
          if (res.length > 0) {
              this.cantidad = res[0][1];
          } else {
            this.cantidad = 0;
          }
        },
        err => {
          this.spinner.hide();
          if (err.status === 404) {
              this.alertSvc.error(err.error, nameModule)
                .then( (_) => {
                  this.router.navigate(['/dashboard/alcancia/']);
              });
          }
        }
      );

      this.alcanciaSvc.valor(id)
      .subscribe(
        res => {
          this.spinner.hide();
          this.moneda = nombre;
          this.bool = true;
          if (res.length > 0) {
            this.valor = res[0][1];
          } else {
            this.valor = 0;
          }
        },
        err => {
          this.spinner.hide();
          if (err.status === 404) {
              this.alertSvc.error(err.error, nameModule)
                .then( (_) => {
                  this.router.navigate(['/dashboard/alcancia/']);
              });
          }
        }
      );
  }

}
