import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class CommonService<E> {

  protected url: string;

  constructor(protected http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get(`${this.url}/`)
              .pipe(
                map( res => res ),
              );
  }

  public listPage(page: string, size: string): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.url}/page`, {params} );
  }

  public view(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  public save(e: E): Observable<any> {
    return this.http.post(`${this.url}/`, e);
  }

  public update(id: number, e: E): Observable<any> {
    return this.http.put(`${this.url}/${id}`, e);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

}
