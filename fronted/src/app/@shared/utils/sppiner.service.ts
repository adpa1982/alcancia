import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SppinerService {

  isLoading$ = new Subject<boolean>();

  show(): void {
    console.log('isLoading$ ', this.isLoading$.next(true));
    this.isLoading$.next(true);
  }

  hide(): void {
    this.isLoading$.next(false);
  }
}
