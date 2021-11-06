import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PruebaValidacionesService {

  constructor(protected http: HttpClient) { }

  public usuarios(): any {
    const params = new HttpParams().append('page', '1');
    return this.http.get(`https://reqres.in/api/user`, { params } );
  }

  public usuariosTransformado(): any {
    const params = new HttpParams().append('page', '1');
    return this.http.get(`https://reqres.in/api/user`, { params } )
                .pipe(
                  delay(300),
                  map( resp => resp['data'] ),
                );
  }

}
