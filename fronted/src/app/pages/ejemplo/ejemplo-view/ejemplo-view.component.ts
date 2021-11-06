import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Ejemplo } from './../../../@core/models/ejemplo';
import { EjemplosService } from 'src/app/@core/services/ejemplos.service';
import { SweetAlertService } from 'src/app/@shared/utils/sweet-alert.service';
import { ModValidaEjemploService } from 'src/app/@shared/utils/modules/mod-valida-ejemplo.service';


@Component({
  selector: 'app-ejemplo-view',
  templateUrl: './ejemplo-view.component.html',
  styleUrls: ['./ejemplo-view.component.css']
})
export class EjemploViewComponent implements OnInit {

  public ejemplo: Ejemplo;

  constructor(private activatedRoute: ActivatedRoute,
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
    const nameModule = 'Modulo de ejemplo';
    this.ejemploSvc.view(id)
      .subscribe(
        res => {
            this.ejemplo = res;
        },
        err => {
          if (err.status === 404) {
              this.alertSvc.error(err.error, nameModule);
              /*this.alertSvc.error(err.error, nameModule)
                .then( (_) => {
                  this.router.navigate(['/dashboard/ejemplo/']);
                }
              );*/
          }
        }
      );
  }

}
