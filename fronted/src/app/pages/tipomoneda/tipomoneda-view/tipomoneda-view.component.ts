import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TipoMoneda } from 'src/app/@core/models/tipo-moneda';
import { TipomonedaService } from 'src/app/@core/services/tipomoneda.service';
import { ModValidaTipomonedaService } from 'src/app/@shared/utils/modules/mod-valida-tipomoneda.service';
import { SweetAlertService } from 'src/app/@shared/utils/sweet-alert.service';

@Component({
  selector: 'app-tipomoneda-view',
  templateUrl: './tipomoneda-view.component.html',
  styleUrls: ['./tipomoneda-view.component.css']
})
export class TipomonedaViewComponent implements OnInit {

  public tipomoneda: TipoMoneda;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private tipomonedaSvc: TipomonedaService,
              private alertSvc: SweetAlertService,
              private spinner: NgxSpinnerService,
              public  tipomonedaValSvc: ModValidaTipomonedaService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({id} ) => {
        this.view(id);
      });
  }

  public view(id: number): void {
    const nameModule = 'Modulo de tipo de moneda';
    this.spinner.show();
    this.tipomonedaSvc.view(id)
      .subscribe(
        res => {
          this.spinner.hide();
          this.tipomoneda = res;
        },
        err => {
          this.spinner.hide();
          if (err.status === 404) {
              this.alertSvc.error(err.error, nameModule)
                .then( (_) => {
                  this.router.navigate(['/dashboard/tipomoneda/']);
              });
          }
        }
      );
  }

}
