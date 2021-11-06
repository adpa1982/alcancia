import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Ejemplo } from './../models/ejemplo';

@Injectable({
  providedIn: 'root'
})
export class EjemplosService {

  protected url = `${environment.base_end_point}/ejemplo`;

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

  public save(ejemplo: Ejemplo): Observable<any> {
    return this.http.post(`${this.url}/`, ejemplo);
  }

  public update(id: number, ejemplo: Ejemplo): Observable<any> {
    return this.http.put(`${this.url}/${id}`, ejemplo);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

}
