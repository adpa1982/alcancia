import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Minibank } from 'src/app/@core/models/minibank';
import { MinibankService } from 'src/app/@core/services/minibank.service';

@Component({
  selector: 'app-minibank-create',
  templateUrl: './minibank-create.component.html',
  styleUrls: ['./minibank-create.component.css']
})
export class MinibankCreateComponent implements OnInit {

  public denominaciones : number[] = [];
  public minibank: Minibank;

  miFormulario: FormGroup = this.fb.group(
    {
      denominacion: ['', [ Validators.required ] ],
    }
  );

  constructor(private fb: FormBuilder,
              private miniBankSvc: MinibankService) { }

  ngOnInit(): void {
    this.denominaciones = this.miniBankSvc.denominaciones;
  }

  campoNoValido(campo: string, form: FormGroup): boolean {
    return !form.get(campo)?.valid && form.get(campo)?.touched;
  }

  campoErrorMsg(campo: string, f: FormGroup): string {
    const errors = f.get(campo)?.errors;
    if (errors?.required) {
        return 'Campo requerido.';
    }
    return '';
  }

  save(event: any): void {
    if (this.miFormulario.invalid)  {
      this.miFormulario.markAllAsTouched();
      return;
    }
    let id = this.miFormulario.get('denominacion').value;
    if (id === null || id === '') {
      this.miFormulario.markAllAsTouched();
      return;
    }
    let save = this.miniBankSvc.save(this.miFormulario.value);

  }

}
