import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alcancia } from 'src/app/@core/models/alcancia';
import { AlcanciaService } from 'src/app/@core/services/alcancia.service';
import { ModValidaAlcanciaService } from 'src/app/@shared/utils/modules/mod-valida-alcancia.service';
import { SweetAlertService } from 'src/app/@shared/utils/sweet-alert.service';

@Component({
  selector: 'app-alcancia-list',
  templateUrl: './alcancia-list.component.html',
  styleUrls: ['./alcancia-list.component.css']
})
export class AlcanciaListComponent implements OnInit {

  settings = Object.assign( {} , this.alcanciaValSvc.parameterSmartTable());
  public source: LocalDataSource = new LocalDataSource();
  public alcancias: Alcancia[] = [];

  constructor(private router: Router,
              private alcanciaSvc: AlcanciaService,
              private alertSvc: SweetAlertService,
              private spinner: NgxSpinnerService,
              public  alcanciaValSvc: ModValidaAlcanciaService) { }

  ngOnInit(): void {
    this.list();
  }

  public list(): void {
    this.spinner.show();
    const nameModule = 'Modulo de alcancia';
    this.alcanciaSvc.list()
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.alcancias = res;
          this.source.load(this.alcancias);
        },
        (err: any) => {
          console.error('Error', err);
          console.warn(err);
          }
      );
  }

  onDeleteConfirm(event: any): void {
    const id = event.data.id;
    const onDelete = '¿Realmente desea eliminar la información de la alcancia del sistema?.';
    const nameModule = 'Modulo de alcancia';
    this.alertSvc.confirm(onDelete).then(confirm => {
      if (confirm) {
          this.spinner.show();
          this.alcanciaSvc.delete(id)
              .subscribe(
                res => {},
                err => {
                  this.spinner.hide();
                  if (err.status === 200) {
                    const onSuccesDelete = 'Alcancia eliminado con exito.';
                      this.alertSvc.success(onSuccesDelete, nameModule);
                      event.confirm.resolve();
                  }
                  if (err.status === 404) {
                    const onNotFound = 'No se encontro la alcancia a eliminar.';
                      this.alertSvc.warning(onNotFound, nameModule);
                  }
                }
              );
      } else {
          const onCancel = 'Canceló la eliminación de la información de la alcancia.';
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
    this.router.navigate(['/dashboard/alcancia/edit/', formData.id]);
  }

  viewRecord(formData: any): void {
    this.router.navigate(['/dashboard/alcancia/view/', formData.id]);
  }

}
