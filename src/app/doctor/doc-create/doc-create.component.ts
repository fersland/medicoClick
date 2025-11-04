import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { IDoctor } from '../../models/idoctor';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-doc-create',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './doc-create.component.html',
  styleUrl: './doc-create.component.css'
})
export class DocCreateComponent {
  doctorForm: FormGroup;

  constructor(private _fbuilder: FormBuilder, private _doctorService: DoctorService){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.doctorForm = this._fbuilder.group({
      identificacion:   ['', [Validators.required, Validators.maxLength(13)]],
      id_empresa:       [user.id_empresa || '', [Validators.required]],
      primerNombre:     ['', [Validators.required, Validators.maxLength(20)]],
      segundoNombre:    ['', [Validators.maxLength(20)]],
      primerApellido:   ['', [Validators.required, Validators.maxLength(20)]],
      segundoApellido:  ['', [Validators.maxLength(20)]],
      email:            ['', [Validators.required, Validators.maxLength(80), Validators.email]],
      activo:           ['', [Validators.required]],
      telefono:         ['', [Validators.required, Validators.maxLength(10)]],
      direccion:        ['', [Validators.required, Validators.maxLength(120)]],
    });
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      const doc: IDoctor = {
        ...this.doctorForm.value,
        activo: this.doctorForm.value.activo === true || this.doctorForm.value.activo === 'true'
      };
  
      this._doctorService.createDoctores(doc).subscribe({
        next: (response) => {
          Swal.fire({
                      icon: 'success',
                      title: 'Datos Guardado correctamente',
                      showConfirmButton: false,
                      timer: 1500
                    });
          this.doctorForm.reset();
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
