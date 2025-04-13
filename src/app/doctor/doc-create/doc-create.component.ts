import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { IDoctor } from '../../models/idoctor';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doc-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './doc-create.component.html',
  styleUrl: './doc-create.component.css'
})
export class DocCreateComponent {
  doctorForm: FormGroup;

  constructor(private _fbuilder: FormBuilder, private _doctorService: DoctorService){
    this.doctorForm = this._fbuilder.group({
      identificacion: ['', [Validators.required, Validators.maxLength(13)]],
      primerNombre: ['', [Validators.required, Validators.maxLength(20)]],
      segundoNombre: ['', [Validators.maxLength(20)]],
      primerApellido: ['', [Validators.required, Validators.maxLength(20)]],
      segundoApellido: ['', [Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.maxLength(80), Validators.email]],
      activo: [null, [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      direccion: ['', [Validators.required, Validators.maxLength(120)]],
    });
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      const doc: IDoctor = {
        ...this.doctorForm.value,
        activo: this.doctorForm.value.activo === 'true' // Convertir a booleano
      };
  
      console.log('Datos enviados:', doc);
  
      this._doctorService.createDoctores(doc).subscribe({
        next: (response) => {
          console.log('Respuesta:', response);
          alert('Doctor creado correctamente.');
          this.doctorForm.reset();
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Error al crear el doctor.');
        }
      });
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}
