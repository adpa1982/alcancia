import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MinibankService } from 'src/app/@core/services/minibank.service';

@Component({
  selector: 'app-minibank-consultar',
  templateUrl: './minibank-consultar.component.html',
  styleUrls: ['./minibank-consultar.component.css']
})
export class MinibankConsultarComponent implements OnInit {

  public denominaciones : number[] = [];

  public moneda: number;
  public cantidad: number;
  public valor: number;
  public bool: boolean;
  public cantidadTotal: number;
  public valorTotal: number;

  miFormulario: FormGroup = this.fb.group(
    {
      denominacion: ['', [ Validators.required ] ],
    }
  );

  constructor(private fb: FormBuilder,
              private miniBankSvc: MinibankService) { }

  ngOnInit(): void {
    this.denominaciones = this.miniBankSvc.denominaciones;
    this.miFormulario.get('denominacion')?.valueChanges
      .subscribe(value => {
        this.bool = false;
      });
    this.cantidadTotal = this.miniBankSvc.cantidadTotal();
    this.valorTotal = this.miniBankSvc.valorTotal();
  }

  consultar(event: any): void {
    if (this.miFormulario.invalid)  {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.bool = true;
    let id = this.miFormulario.get('denominacion').value;
    this.moneda = id;
    this.cantidad = this.miniBankSvc.cantidad(id);
    this.valor = this.miniBankSvc.valor(id);
  }

}
