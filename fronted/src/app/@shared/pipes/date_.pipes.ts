/*
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateConvert' })
export class DateConvertPipe implements PipeTransform {

  transform(date: any): any {
    if (date != null && date != undefined && date != '') {
      const dts = date.split('-');
      const frm = dts[2].split(' ')[1] ? 'DD-MM-YYYY h:mm:ss' : 'DD-MM-YYYY';
      const hour = dts[2].split(' ')[1] ? dts[2].split(' ')[1] : '';
      const dates = `${dts[1]}-${dts[0]}-${dts[2].split(' ')[0]} ${hour}`;
      return moment(new Date(dates)).format(frm);
    } else {
      return 'No aplica';
    }
  }
}
*/

/*

cnstructor: private utilDate: UtilDate
 today: string;
 this.today = this.utilDate.newDate();

  fechaIni: any;
  this.fechaIni = this.utilDate.getDate(val);

import * as moment from 'moment';

export class UtilDate {
  constructor() {}

  //Convierte un objeto date a una fecha valida
  //Se le resta - 1 al mes ya que al darle el format con moment el moment suma 1 al mes.
  getDate = date => new Date(date.year, date.month - 1, date.day);

  newDate = (): string => moment(new Date()).format('YYYY-MM-DD');

  formatDate = date => moment(date).format('YYYY-MM-DD');

}

*/
