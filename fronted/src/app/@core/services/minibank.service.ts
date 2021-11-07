import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Minibank } from '../models/minibank';


@Injectable({
  providedIn: 'root'
})
export class MinibankService {

  private _denominaciones: number[] = [50, 100, 200, 500, 1000];

  public minibanks: Minibank[] =  [];

  constructor() { }

  get denominaciones(): number[] {
    return [ ...this._denominaciones ];
  }

  public save(minibank: Minibank) {
    console.log(minibank);
    this.minibanks.push(minibank)
    localStorage.setItem('minibanks', JSON.stringify(this.minibanks));
    return this.minibanks;
  }

  public cantidad(id: number) {
    let can = 0;
    this.minibanks = JSON.parse(localStorage.getItem("minibanks"));
    for (let i=0; i <= this.minibanks.length-1; i++) {
        if (id === this.minibanks[i].denominacion) {
          can++;
        }
    }
    return can;
  }

  public valor(id: number) {
    let sum = 0;
    this.minibanks = JSON.parse(localStorage.getItem("minibanks"));
    for (let i=0; i <= this.minibanks.length-1; i++) {
        if (id === this.minibanks[i].denominacion) {
          sum = sum + this.minibanks[i].denominacion;
        }
    }
    return sum;
  }

  public cantidadTotal() {
    this.minibanks = JSON.parse(localStorage.getItem("minibanks"));
    return this.minibanks.length;
  }

  public valorTotal() {
    let sum = 0;
    this.minibanks = JSON.parse(localStorage.getItem("minibanks"));
    for (let i=0; i <= this.minibanks.length-1; i++) {
          sum = sum + this.minibanks[i].denominacion;
    }
    return sum;
  }


}
