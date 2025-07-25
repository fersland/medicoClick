import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaClienteService } from '../../services/empresa-cliente.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ICliente } from '../../models/icliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-edit',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-edit.component.html',
  styleUrl: './cliente-edit.component.css'
})
export class ClienteEditComponent {
  form: FormGroup;
  private readonly letrasValidator = Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/);
  clientesId!: string;

  constructor(
                private _formBuilder: FormBuilder,
                private _route: ActivatedRoute,
                private _router: Router,
                private _service: EmpresaClienteService
              ){
                  this.form = this.buildForm();
              }

  ngOnInit(): void {
    this.clientesId = this._route.snapshot.paramMap.get('id')!;

    this._service.getByIdEmpresasClientes(this.clientesId).subscribe({
      next: (model: ICliente) => {
        this.form.patchValue(model);
      },

      error: (err) => {
        this._router.navigate(['/cliente']);
      }
    });
  }

  private buildForm(): FormGroup {
    return this._formBuilder.group({
      identificacion:     ['', [Validators.required, Validators.maxLength(13)]],
      razonSocial:        ['', [Validators.maxLength(100)]],
      primerNombre:       ['', [Validators.required, Validators.maxLength(20), this.letrasValidator]],
      segundoNombre:      ['', [Validators.maxLength(20), this.letrasValidator]],
      primerApellido:     ['', [Validators.required, Validators.maxLength(20), this.letrasValidator]],
      segundoApellido:    ['', [Validators.maxLength(20), this.letrasValidator]],
      email:              ['', [Validators.required, Validators.maxLength(80), Validators.email]],
      telefono:           ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  update(): void {
    if(this.form.valid) {
      const model: ICliente = {
        ...this.form.value,
        id: this.clientesId,
        activo: true
      };

      this._service.updateEmpresasClientes(model).subscribe({
        next: (response) => {
                            Swal.fire({
                                        icon: 'success',
                                        title: 'Datos actualizados correctamente',
                                        showConfirmButton: false,
                                        timer: 1500
                                      });
                            this._router.navigate(['/cliente']);
                          },
                          error: (err) => {
                            Swal.fire({
                                        icon: 'error',
                                        title: 'Error al editar los datos.',
                                        text: 'Por favor, intenta nuevamente.',
                                        showConfirmButton: false,
                                        timer: 1500
                                      });
                          }
              });
            }else{
                      Swal.fire({
                              icon: 'warning',
                              title: 'Formulario incompleto',
                              text: 'Por favor, completa todos los campos requeridos.',
                              showConfirmButton: false,
                              timer: 1500
                            });
            }    
  }

  soloLetras(event: KeyboardEvent): void {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!regex.test(inputChar)) {
      event.preventDefault();
    }
  }

  permitirSoloNumeros(event: KeyboardEvent): void {
    const chars = event.charCode;

    if(chars < 48 || chars > 57 ){
      event.preventDefault();
    }
  }

}
