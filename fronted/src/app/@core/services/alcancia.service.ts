import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Alcancia } from '../models/alcancia';

@Injectable({
  providedIn: 'root'
})
export class AlcanciaService {

  protected url = `${environment.base_end_point}/bank`;

  constructor(private http: HttpClient) {}

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

  public save(alcancia: Alcancia): Observable<any> {
    return this.http.post(`${this.url}/`, alcancia);
  }

  public update(id: number, alcancia: Alcancia): Observable<any> {
    return this.http.put(`${this.url}/${id}`, alcancia);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  public cantidad(id: number): Observable<any> {
    return this.http.get(`${this.url}/cantidad/${id}`);
  }

  public valor(id: number): Observable<any> {
    return this.http.get(`${this.url}/valor/${id}`);
  }

  public totalCantidad(): Observable<any> {
    return this.http.get(`${this.url}/totalcantidad`);
  }

  public totalValor(): Observable<any> {
    return this.http.get(`${this.url}/totalvalor/`);
  }

}
