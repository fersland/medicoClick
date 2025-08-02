import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iuser } from '../../models/iuser';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from'@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  errorMessage: string = '';

  constructor(
      private _formBuilder: FormBuilder,
      private _service: AuthService,
      private _route: Router
  ){
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this._formBuilder.group({
      email:    ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if(this.form.valid) {
      this.loading = true;

      const model: Iuser =  {
        ...this.form.value,
      };

      console.log('datos enviados: ', model);

      this._service.loginService(model).subscribe({
        next: (response) => {
          console.log('Sesión iniciada correctamente.', response);

          localStorage.setItem('token', response.token);
          this._route.navigate(['/doc']);
        },

        error: (err) => {
          console.error('Error al iniciar sesion: ', err);
          this.loading = false;

          if(err.status === 401) {
            this.errorMessage = 'Credenciales incorrectas. Verifica tu email y clave.';
          }else{
            this.errorMessage = 'Ocurrió un error al iniciar sesión. Intenta de nuevo.';
          }
        },

        complete: () => {
          this.loading = false;
        }
      });
    }
  }

}
