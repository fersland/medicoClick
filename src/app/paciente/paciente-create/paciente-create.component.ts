import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Ipaciente, Sexo } from '../../models/ipaciente';
import { PacienteService } from '../../services/paciente.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-create',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './paciente-create.component.html',
  styleUrl: './paciente-create.component.css'
})
export class PacienteCreateComponent {
  pacienteForm: FormGroup;
  soloLetrasEspacios = Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/);

  constructor(private _fbuilder: FormBuilder,
              private _service: PacienteService
  ) {
    this.pacienteForm = this._fbuilder.group({      
      identificacion:     ['', [Validators.required, Validators.maxLength(13), Validators.pattern(/^\d+$/)]],
      primerNombre:       ['', [Validators.required, Validators.maxLength(20), this.soloLetrasEspacios]],
      segundoNombre:      ['', [Validators.maxLength(20), this.soloLetrasEspacios]],
      primerApellido:     ['', [Validators.required, Validators.maxLength(20), this.soloLetrasEspacios]],
      segundoApellido:    ['', [Validators.maxLength(20), this.soloLetrasEspacios]],
      email:              ['', [Validators.required, Validators.email, Validators.maxLength(80)]],
      telefono:           ['', [Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
      direccion:          ['', [Validators.maxLength(120)]],
      fechaNacimiento:    ['', [Validators.required, this.noFutureDateValidator()]],
      sexo:               ['', [Validators.required, this.enumValidator(['M', 'F'])]],
    });
  }

  enumValidator(validValues: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return validValues.includes(control.value) ? null : { invalidEnum: true };
    };
  }

  noFutureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = new Date(control.value);
      return date > new Date() ? { futureDate: true } : null;
    };
  }

  sexoOptions = [
    { label: 'Masculino', value: Sexo.Masculino },
    { label: 'Femenino', value: Sexo.Femenino },
    { label: 'Otro', value: Sexo.Otro }
  ];

  permitirSoloNumeros(event: KeyboardEvent): void {
    const charCode = event.charCode;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  permitirSoloLetrasEspacios(event: KeyboardEvent): void {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!regex.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit() {
      if (this.pacienteForm.valid) {
        const pct: Ipaciente = {
          ...this.pacienteForm.value,
          activo: true
        };
    
        console.log('Datos enviados:', pct);
    
        this._service.createPaciente(pct).subscribe({
          next: (response) => {
            console.log('Respuesta:', response);
            Swal.fire({
                        icon: 'success',
                        title: 'Datos Guardado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                      });
            this.pacienteForm.reset();
          },
          error: (err) => {
                    console.error('Error: ', err);
                    console.log('Error al guardar los datos.');
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
