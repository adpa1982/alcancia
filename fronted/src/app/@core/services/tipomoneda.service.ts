import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { TipoMoneda } from '../models/tipo-moneda';

@Injectable({
  providedIn: 'root'
})
export class TipomonedaService {

  protected url = `${environment.base_end_point}/tipomoneda`;

  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get(`${this.url}/`)
              .pipe(
                delay(300),
                map( res => res ),
              );
  }

  public view(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  public save(tipoMoneda: TipoMoneda): Observable<any> {
    return this.http.post(`${this.url}/`, tipoMoneda);
  }

  public update(id: number, tipoMoneda: TipoMoneda): Observable<any> {
    return this.http.put(`${this.url}/${id}`, tipoMoneda);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  public allTipoMonedas(): Observable<any> {
    return this.http.get(`${this.url}/all`);
  }
}
