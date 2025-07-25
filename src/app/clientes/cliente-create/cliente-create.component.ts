import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaClienteService } from '../../services/empresa-cliente.service';
import { CommonModule} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ICliente } from '../../models/icliente';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-create',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.css'
})
export class ClienteCreateComponent {
  modelForm: FormGroup;
  private readonly letrasValidator = Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/);

  constructor(
                private _fbuilder: FormBuilder,
                private _service: EmpresaClienteService){

                  this.modelForm = this.buildForm();
              }

  private buildForm(): FormGroup {
    return this._fbuilder.group({
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

  permitirSoloNumeros(event: KeyboardEvent): void {
    const chars = event.charCode;

    if(chars < 48 || chars > 57 ){
      event.preventDefault();
    }
  }

  soloLetras(event: KeyboardEvent): void {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!regex.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit(){
    if(this.modelForm.valid){
      const model: ICliente =  {
        ...this.modelForm.value,
        activo: true
      };


      this._service.createEmpresasClientes(model).subscribe({
        next: (response) => {

          Swal.fire({
                      icon: 'success',
                      title: 'Datos Guardado correctamente',
                      showConfirmButton: false,
                      timer: 1500
                    });
                      this.modelForm.reset();
                    },
                    error: (err) => {
                              Swal.fire({
                                icon: 'error',
                                title: 'Error al guardar los datos.',
                                text: 'Por favor, intenta nuevamente.',
                                showConfirmButton: false,
                                timer: 1300
                              });
                            }
                  });
                } else {
                  Swal.fire({
                          icon: 'warning',
                          title: 'Formulario incompleto',
                          text: 'Por favor, completa todos los campos requeridos.',
                          showConfirmButton: false,
                          timer: 1300
                        });
                }
        }
}
