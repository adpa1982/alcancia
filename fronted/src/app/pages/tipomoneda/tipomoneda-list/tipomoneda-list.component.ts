import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlertService } from 'src/app/@shared/utils/sweet-alert.service';

import { TipoMoneda } from 'src/app/@core/models/tipo-moneda';
import { TipomonedaService } from 'src/app/@core/services/tipomoneda.service';
import { ModValidaTipomonedaService } from 'src/app/@shared/utils/modules/mod-valida-tipomoneda.service';


@Component({
  selector: 'app-tipomoneda-list',
  templateUrl: './tipomoneda-list.component.html',
  styleUrls: ['./tipomoneda-list.component.css']
})
export class TipomonedaListComponent implements OnInit {

  settings = Object.assign( {} , this.tipomonedaValSvc.parameterSmartTable());
  public source: LocalDataSource = new LocalDataSource();
  public tipomoneda: TipoMoneda[] = [];

  constructor(private router: Router,
              private tipomonedaSvc: TipomonedaService,
              private alertSvc: SweetAlertService,
              private spinner: NgxSpinnerService,
              public  tipomonedaValSvc: ModValidaTipomonedaService) { }

  ngOnInit(): void {
    this.list();
  }

  public list(): void {
    this.spinner.show();
    const nameModule = 'Modulo de tipo de moneda';
    this.tipomonedaSvc.list()
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.tipomoneda = res;
          this.source.load(this.tipomoneda);
        },
        (err: any) => {
          console.error('Error', err);
          console.warn(err);
          }
      );
  }

  onDeleteConfirm(event: any): void {
    const id = event.data.id;
    const onDelete = '¿Realmente desea eliminar la información del tipo de moneda del sistema?.';
    const nameModule = 'Modulo de tipo de moneda';
    this.alertSvc.confirm(onDelete).then(confirm => {
      if (confirm) {
          this.spinner.show();
          this.tipomonedaSvc.delete(id)
              .subscribe(
                res => {},
                err => {
                  this.spinner.hide();
                  if (err.status === 200) {
                    const onSuccesDelete = 'Tipo de moneda eliminado con exito.';
                      this.alertSvc.success(onSuccesDelete, nameModule);
                      event.confirm.resolve();
                  }
                  if (err.status === 404) {
                      const onNotFound = 'No se encontro el tipo de moneda a eliminar.';
                      this.alertSvc.warning(onNotFound, nameModule);
                  }
                }
              );
      } else {
          const onCancel = 'Canceló la eliminación de la información del tipo de moned.';
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
    this.router.navigate(['/dashboard/tipomoneda/edit/', formData.id]);
  }

  viewRecord(formData: any): void {
    this.router.navigate(['/dashboard/tipomoneda/view/', formData.id]);
  }

}
