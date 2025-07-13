import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IDoctor } from '../../models/idoctor';
import { DoctorService } from '../../services/doctor.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doc-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './doc-list.component.html',
  styleUrl: './doc-list.component.css'
})
export class DocListComponent {
  doctores: IDoctor[] = [];
  loading: boolean = true;

  constructor(private _doctorService: DoctorService) { }
  
  ngOnInit(): void {
    this.getDoctores();
  }

  
  getDoctores(): void{
    this._doctorService.getAllDoctores().subscribe((data: IDoctor[]) => {
      console.log(data);
      this.doctores = data;
      this.loading = false;
    }, (error) => {
      console.error(error);
      this.loading = false;
    });
  }

  deleteDoctor(id: string): void {
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
              console.log('ID de doctor a eliminar:', id);
              this._doctorService.deleteDoctor(id).subscribe({
                next: (response) => {
                      console.log('Especialidad eliminada:', response);
                      this.getDoctores();
                      Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'Los datos fueron eliminados correctamente.',
                        showConfirmButton: false,
                        timer: 2000
                      });
                    },
                error: (err) => {
                    console.error('Error al eliminar los datos.:', err);
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'No se pudo eliminar, por favor, intenta nuevamente.',
                      showConfirmButton: false,
                      timer: 2000
                    });
                  }
              });
            }
          });
        }
}
