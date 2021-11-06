import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    return this.http.get<any[]>('../../../assets/db.json')
                .pipe(
                    delay(3000),
                  map( resp => {
                    let res = null;
                    // tslint:disable-next-line: no-string-literal
                    resp['usuarios'].forEach(element => {
                      if (email === element.email) {
                          res = element.email;
                      }
                    });

                    return ( res === null )  ? null : { emailTomado: true };
                  })
                );

    /*return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${ email }`)
                .pipe(
                    delay(3000),
                  map( resp => {
                    return ( resp.length === 0 )  ? null : { emailTomado: true }
                  })
                );*/
  }

}