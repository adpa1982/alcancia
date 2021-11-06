import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alcancia } from 'src/app/@core/models/alcancia';
import { AlcanciaService } from 'src/app/@core/services/alcancia.service';
import { ModValidaAlcanciaService } from 'src/app/@shared/utils/modules/mod-valida-alcancia.service';
import { SweetAlertService } from 'src/app/@shared/utils/sweet-alert.service';

@Component({
  selector: 'app-alcancia-view',
  templateUrl: './alcancia-view.component.html',
  styleUrls: ['./alcancia-view.component.css']
})
export class AlcanciaViewComponent implements OnInit {

  public alcancia: Alcancia;
  public cantidad: number;
  public valor: number;

  constructor(private router: Router,
              private alcanciaSvc: AlcanciaService,
              private alertSvc: SweetAlertService,
              private spinner: NgxSpinnerService,
              public  alcanciaValSvc: ModValidaAlcanciaService) { }

  ngOnInit(): void {
    this.view();
  }

  public view(): void {
    this.alcanciaSvc.totalCantidad()
      .subscribe(
          (res: any) => {
            this.cantidad = res;
          },
          (err: any) => console.error(err)
      );

      this.alcanciaSvc.totalValor()
      .subscribe(
          (res: any) => {
            if (res == null) {
              this.valor = 0;
            } else {
              this.valor = res;
            }


          },
          (err: any) => console.error(err)
      );
  }

}
