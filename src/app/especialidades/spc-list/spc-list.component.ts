import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IEspecialidades } from '../../models/iespecialidades';
import { EspecialidadService } from '../../services/especialidad.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-spc-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './spc-list.component.html',
  styleUrl: './spc-list.component.css'
})

export class SpcListComponent {
  loading: boolean = true;
  especialides: IEspecialidades[] = [];

  constructor(private _spcService:EspecialidadService){}

  ngOnInit(){
    this.getEspecialidades();
  }

  getEspecialidades(): void{
    this._spcService.getAllspc().subscribe((data: IEspecialidades[]) => {
      console.log(data);
      this.especialides = data;
      this.loading = false;
    }, (error) =>{
      console.error(error);
      this.loading = false;
    });
  }

  deleteEspecialidad(id: string): void {
    console.log('ID de especialidad a eliminar:', id); // Verificar el ID que se está pasando
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la especialidad de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._spcService.deleteEspecialidad(id).subscribe({
          next: (response) => {
            console.log('Especialidad eliminada:', response);
            this.getEspecialidades();
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'La especialidad ha sido eliminada correctamente.',
              showConfirmButton: false,
              //timer: 1200
            });
          },
          error: (err) => {
            console.error('Error al eliminar la especialidad:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la especialidad. Por favor, intenta nuevamente.',
              showConfirmButton: false,
              //timer: 2200
            });
          }
        });
      }
    });
  }
  

}
