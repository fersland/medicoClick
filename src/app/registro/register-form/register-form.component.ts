import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Iuser } from '../../models/iuser';
import { AuthService } from '../../services/auth.service';
import { OnlyLettersDirective } from '../../directives/only-letters.directive';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, OnlyLettersDirective, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  form: FormGroup;

  constructor(
        private _formBuilder: FormBuilder,
        private _service: AuthService
  ){
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this._formBuilder.group({
      usuario:          ['', [Validators.required, Validators.maxLength(80)]],
      primerNombre:     ['', [Validators.required, Validators.maxLength(40)]],
      segundoNombre:    ['', [Validators.maxLength(40)]],
      primerApellido:   ['', [Validators.required, Validators.maxLength(40)]],
      segundoApellido:  ['', [Validators.maxLength(40)]],
      email:            ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      password:         ['', [Validators.required]],
      password_confirmation:        ['', [Validators.required]]
    });
  }

  registro() {
    if(this.form.valid) {
      const model: Iuser =  {
        ...this.form.value,

      };

      console.log('modelo del registro: ', model);

      this._service.reigter(model).subscribe({
        next: (response) => {
          Swal.fire({
                      icon: 'success',
                      title: 'Datos Guardado correctamente',
                      showConfirmButton: false,
                      timer: 1500
                    });
                    this.form.reset();
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
