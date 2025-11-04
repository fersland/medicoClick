import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { IDoctor } from '../../models/idoctor';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doc-edit',
  imports: [ReactiveFormsModule, RouterLink],
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
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.doctorForm = this._fbuilder.group({
        identificacion:     ['', [Validators.required, Validators.maxLength(13)]],
        id_empresa:         [user.id_empresa || '', [Validators.required]],
        primerNombre:       ['', [Validators.required, Validators.maxLength(20)]],
        segundoNombre:      ['', [Validators.maxLength(20)]], // Campo opcional
        primerApellido:     ['', [Validators.required, Validators.maxLength(20)]],
        segundoApellido:    ['', [Validators.maxLength(20)]], // Campo opcional
        email:              ['', [Validators.required, Validators.email, Validators.maxLength(80)]],
        activo:             [null, [Validators.required]],
        telefono:           ['', [Validators.required, Validators.maxLength(10)]],
        direccion:          ['', [Validators.required, Validators.maxLength(120)]],
      });
    }

    ngOnInit(): void {
        this.doctorId = this._routeActivated.snapshot.paramMap.get('id')!;
        this._doctorService.getDoctorById(this.doctorId).subscribe({
          next: (resp: any) => {
            const doctor = resp.data;
            const formDoctor = {
              identificacion: doctor.identificacion,
              primerNombre: doctor.primerNombre,
              segundoNombre: doctor.segundoNombre || '',
              primerApellido: doctor.primerApellido,
              segundoApellido: doctor.segundoApellido || '',
              email: doctor.email || '',
              activo: doctor.activo === 1 || doctor.activo === true,
              telefono: doctor.telefono || '',
              direccion: doctor.direccion || ''
            }
            this.doctorForm.patchValue(formDoctor);
          },
          error: (err) => {
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
            Swal.fire({
                        icon: 'success',
                        title: 'Datos actualizados correctamente',
                        showConfirmButton: false,
                        timer: 1500
                      });
            this._route.navigate(['/doc']);
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
      } else {
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
