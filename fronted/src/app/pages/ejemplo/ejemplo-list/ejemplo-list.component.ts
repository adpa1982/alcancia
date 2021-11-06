import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalDataSource } from 'ng2-smart-table';
import { NgxSpinnerService } from 'ngx-spinner';

import { EjemplosService } from './../../../@core/services/ejemplos.service';
import { Ejemplo } from './../../../@core/models/ejemplo';
import { SweetAlertService } from 'src/app/@shared/utils/sweet-alert.service';
import { ModValidaEjemploService } from 'src/app/@shared/utils/modules/mod-valida-ejemplo.service';


@Component({
  selector: 'app-ejemplo-list',
  templateUrl: './ejemplo-list.component.html',
  styleUrls: ['./ejemplo-list.component.css']
})
export class EjemploListComponent implements OnInit {

  settings = Object.assign( {} , this.ejeValSvs.parameterSmartTable());
  public source: LocalDataSource = new LocalDataSource();
  public ejemplos: Ejemplo[] = [];

  constructor(private router: Router,
              private ejemploSvc: EjemplosService,
              private alertSvc: SweetAlertService,
              private spinner: NgxSpinnerService,
              public  ejeValSvs: ModValidaEjemploService) {
  }

  ngOnInit(): void {
    this.list();
  }

  public list(): void {
    this.spinner.show();
    this.ejemploSvc.list()
      .subscribe(
          (res: any) => {
            this.ejemplos = res;
            this.source.load(this.ejemplos);
            this.spinner.hide();
          },
          (err: any) => {
            console.error('EjemploComp', err);
            console.warn(err);
          }
      );
  }

  onDeleteConfirm(event: any): void {
    const id = event.data.id;
    const onDelete = '¿Realmente desea eliminar la información del ejemplo del sistema?.';
    const nameModule = 'Modulo de ejemplo';
    this.alertSvc.confirm(onDelete).then(confirm => {
      if (confirm) {
          this.ejemploSvc.delete(id)
              .subscribe(
                  res => {},
                  err => {
                    if (err.status === 200) {
                        const onSuccesDelete = 'Ejemplo eliminado con exito.';
                        this.alertSvc.success(onSuccesDelete, nameModule);
                        event.confirm.resolve();
                    }
                    if (err.status === 404) {
                        const onNotFound = 'No se encontro el ejemplo a eliminar.';
                        this.alertSvc.warning(onNotFound, nameModule);
                    }
                  }
              );
      } else {
          const onCancel = 'Canceló la eliminación de la información del ejemplo.';
          this.alertSvc.info(onCancel, nameModule);
          event.confirm.reject();
      }
    });
  }

  onCustomAction(event: any): void {
    switch (event.action) {
      case 'editrecord':
            this.editRecord(event.data);
            break;
      case 'viewrecord':
            this.viewRecord(event.data);
            break;
    }
  }

  editRecord(formData: any): void {
    this.router.navigate(['/dashboard/ejemplo/edit/', formData.id]);
  }

  viewRecord(formData: any): void {
    this.router.navigate(['/dashboard/ejemplo/view/', formData.id]);
  }

}
