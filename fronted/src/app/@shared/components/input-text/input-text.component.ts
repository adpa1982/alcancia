import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {

  @Input() nameInput: any;
  @Input() campoNoValido: boolean;
  @Input() campoErrorMsg: any;
  @Input() errorBackend: any;
  ocultarCampoNoValido: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
