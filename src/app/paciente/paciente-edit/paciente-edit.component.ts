import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { Ipaciente, Sexo } from '../../models/ipaciente';
import { CommonModule } from '@angular/common'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-edit',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './paciente-edit.component.html',
  styleUrl: './paciente-edit.component.css'
})
export class PacienteEditComponent {
  pacienteForm: FormGroup;
  pacienteId!: string;
  sexoEnum = Sexo;
  soloLetrasEspacios = Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/);
  
  constructor(
    private _fbuilder: FormBuilder,
    private _routeActivated: ActivatedRoute,
    private _route: Router,
    private _service: PacienteService
  ){
    this.pacienteForm = this._fbuilder.group({
      identificacion:     ['', [Validators.required, Validators.maxLength(13), Validators.pattern(/^\d+$/)]],
      primerNombre:       ['', [Validators.required, Validators.maxLength(20), this.soloLetrasEspacios]],
      segundoNombre:      ['', [Validators.maxLength(20), this.soloLetrasEspacios]],
      primerApellido:     ['', [Validators.required, Validators.maxLength(20), this.soloLetrasEspacios]],
      segundoApellido:    ['', [Validators.maxLength(20), this.soloLetrasEspacios]],
      email:              ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      telefono:           ['', [Validators.maxLength(15)]],
      direccion:          ['', [Validators.required, Validators.maxLength(255)]],
      fechaNacimiento:    ['', [Validators.required, this.noFutureDateValidator()]],
      sexo:               ['', [Validators.required, this.enumValidator(['M', 'F'])]],
    })
  }

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

  ngOnInit(): void {
    this.pacienteId = this._routeActivated.snapshot.paramMap.get('id')!;
    console.log('Paciente ID: ', this.pacienteId);

    this._service.getPacienteById(this.pacienteId).subscribe({
      next: (paciente: Ipaciente) => {
        this.pacienteForm.patchValue(paciente);
      },

      error: (err) => {
        console.error('Error al cargar los datos.', err);
        this._route.navigate(['/paciente']);
      }
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

  onSubmit(): void {
    if(this.pacienteForm.valid){
      const paciente: Ipaciente = {
        ...this.pacienteForm.value,
        id: this.pacienteId,
        activo: true
      };

      this._service.updatePaciente(paciente).subscribe({
        next: (response) => {
                    console.log('Doctor actualizado:', response);
                    Swal.fire({
                                icon: 'success',
                                title: 'Datos actualizados correctamente',
                                showConfirmButton: false,
                                timer: 1500
                              });
                    this._route.navigate(['/paciente']);
                  },
                  error: (err) => {
                    console.error('Error al actualizar los datos:', err);
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
      console.log('Formulario inválido:', this.pacienteForm);
              console.log('Errores:', this.pacienteForm.errors);
              Swal.fire({
                      icon: 'warning',
                      title: 'Formulario incompleto',
                      text: 'Por favor, completa todos los campos requeridos.',
                      showConfirmButton: false,
                      timer: 1500
                    });
    }
  }

}
