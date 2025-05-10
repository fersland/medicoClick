import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EspecialidadService } from '../../services/especialidad.service';
import { IEspecialidades } from '../../models/iespecialidades';

@Component({
  selector: 'app-spc-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './spc-edit.component.html',
  styleUrl: './spc-edit.component.css'
})
export class SpcEditComponent {
  _formGroup: FormGroup;
  loading: boolean = true;
  spcId!: string;

  constructor(
    private _fbuilder: FormBuilder,
    private _routeActivated: ActivatedRoute,
    private _route: Router,
    private _spcService: EspecialidadService
  ){

    this._formGroup = this._fbuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      activo: [null, [Validators.required]],
    });

  }

  ngOnInit(): void{
    this.spcId = this._routeActivated.snapshot.paramMap.get('id')!;
    this._spcService.getEspecialidadById(this.spcId).subscribe({
      next: (spcenter: IEspecialidades) => {
        const formatteddata = {
          ...spcenter,
          activo: spcenter.activo ? 'true' : 'false'
        };
        this._formGroup.patchValue(formatteddata);
        console.log('Datos de especialidad:', formatteddata); 


      },
      error: (err) => {
        console.error('Error al cargar la especialidad:', err);
        alert('No se pudo cargar la especialidad.');
        this._route.navigate(['/spc']);
      }

    });
  }

  onSubmit(): void{
    if(this._formGroup.valid){
      const spc: IEspecialidades = {
        ...this._formGroup.value,
        id: this.spcId,
        activo: this._formGroup.value.activo === 'true' || this._formGroup.value.activo === true
      };
      
      this._spcService.updateEspecialidad(spc).subscribe({
        next: (response) => {
          console.log('Especialidad actualizada:', response);
          alert('Especialidad actualizada correctamente.');
          this._route.navigate(['/spc']);
        },
        error: (err) => {
          console.error('Error al actualizar la especialidad:', err);
          alert('No se pudo actualizar la especialidad.');
        }
      });
    }else{
        console.log('Formulario inválido:', this._formGroup);
        console.log('Errores:', this._formGroup.errors);
        alert('Por favor, completa todos los campos requeridos.');
    }
  }
}
