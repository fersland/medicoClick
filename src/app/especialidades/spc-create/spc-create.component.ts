import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EspecialidadService } from '../../services/especialidad.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IEspecialidades } from '../../models/iespecialidades';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-spc-create',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './spc-create.component.html',
  styleUrl: './spc-create.component.css'
})
export class SpcCreateComponent {
  _formGroup!: FormGroup;

  constructor(
      private _spcService: EspecialidadService, 
      private _fbuilder: FormBuilder){
    
        this.inicializarFormGroup();
  }

  private inicializarFormGroup(): void{
    this._formGroup = this._fbuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(80)]],
      activo: ['', [Validators.required]],
    });
  }

  onSubmit(){
    if(this._formGroup.valid){
      const spcform: IEspecialidades = {
        ...this._formGroup.value,
        activo: this._formGroup.value.activo == 'true'
      };

      console.log('datos enviados: ', spcform);

      this._spcService.crearEspecialidad(spcform).subscribe({
        next: (response) => {
          console.log('Respuesta:', response);
          Swal.fire({
            icon: 'success',
            title: 'Especialidad creada correctamente',
            showConfirmButton: false,
            timer: 1300
          });
          console.log('Respuesta: ', response);
          console.log('Especialidad creada correctamente.');
          this._formGroup.reset();
        },

        error: (err) => {
          console.error('Error: ', err);
          console.log('Error al crear la especialidad.');
          Swal.fire({
            icon: 'error',
            title: 'Error al crear el doctor',
            text: 'Por favor, intenta nuevamente.',
            showConfirmButton: false,
            timer: 1300
          });
        }
      });

    }else{
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
