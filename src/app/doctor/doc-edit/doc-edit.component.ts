import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { IDoctor } from '../../models/idoctor';

@Component({
  selector: 'app-doc-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './doc-edit.component.html',
  styleUrl: './doc-edit.component.css'
})
export class DocEditComponent {
  doctorForm: FormGroup;
  doctorId!: string;

  constructor(
      private _fbuilder: FormBuilder,
      private _routeActivated: ActivatedRoute,
      private _route: Router,
      private _doctorService: DoctorService
    
    ) {
      
      this.doctorForm = this._fbuilder.group({
        identificacion: ['', [Validators.required, Validators.maxLength(13)]],
        primerNombre: ['', [Validators.required, Validators.maxLength(20)]],
        segundoNombre: ['', [Validators.maxLength(20)]], // Campo opcional
        primerApellido: ['', [Validators.required, Validators.maxLength(20)]],
        segundoApellido: ['', [Validators.maxLength(20)]], // Campo opcional
        email: ['', [Validators.required, Validators.email, Validators.maxLength(80)]],
        activo: [null, [Validators.required]], // Asegúrate de que sea válido
        telefono: ['', [Validators.required, Validators.maxLength(10)]],
        direccion: ['', [Validators.required, Validators.maxLength(120)]],
      });
    }

    ngOnInit(): void {
        this.doctorId = this._routeActivated.snapshot.paramMap.get('id')!;
        this._doctorService.getDoctorById(this.doctorId).subscribe({
          next: (doctor: IDoctor) => {
            this.doctorForm.patchValue(doctor);
          },
          error: (err) => {
            console.error('Error al cargar el doctor:', err);
            alert('No se pudo cargar el doctor.');
            this._route.navigate(['/doc']);
          }
        });
    }

    onSubmit(): void {
      if (this.doctorForm.valid) {
        const doc: IDoctor = {
          ...this.doctorForm.value,
          id: this.doctorId,
          activo: this.doctorForm.value.activo === 'true' || this.doctorForm.value.activo === true
        };
    
        this._doctorService.updateDoctor(doc).subscribe({
          next: (response) => {
            console.log('Doctor actualizado:', response);
            alert('Doctor actualizado correctamente.');
            this._route.navigate(['/doc']);
          },
          error: (err) => {
            console.error('Error al actualizar el doctor:', err);
            alert('Error al actualizar el doctor.');
          }
        });
      } else {
        console.log('Formulario inválido:', this.doctorForm);
        console.log('Errores:', this.doctorForm.errors);
        alert('Por favor, completa todos los campos requeridos.');
      }
    }
}
