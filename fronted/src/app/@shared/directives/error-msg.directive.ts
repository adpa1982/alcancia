import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[error-msg]'
})
export class ErrorMsgDirective implements OnInit, OnChanges {

  private _color: string = 'red';
  private _mensaje: string = 'Este campo es requerido';

  htmlElement: ElementRef<HTMLElement>;

  @Input() set color(valor: string) {
    this.setColor();
    this._color = valor;
  }

  @Input() set mensaje(valor: string) {
    this.setMensaje();
    this._mensaje = valor;
  }

  @Input() set valido(valor: boolean) {
    if ( valor ) {
      this.htmlElement.nativeElement.classList.add('hidden');
    } else {
      this.htmlElement.nativeElement.classList.remove('hidden');
    }
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }

  ngOnChanges(changes: SimpleChanges): void {
    /*if ( changes.mensaje ) {
        const mensaje = changes.mensaje.currentValue;
        this.htmlElement.nativeElement.innerText = mensaje;
    }
    if ( changes.color ) {
      const color = changes.color.currentValue;
      this.htmlElement.nativeElement.style.color = color;
    }*/
  }

  ngOnInit(): void {
    console.log('ngOnInit directiva');
    this.setColor();
    this.setMensaje();
  }

  setColor(): void {
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setMensaje(): void {
    this.htmlElement.nativeElement.innerText = this._mensaje;
  }

}
