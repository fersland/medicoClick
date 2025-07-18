import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ipaciente } from '../../models/ipaciente';
import { PacienteService } from '../../services/paciente.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './paciente-list.component.html',
  styleUrl: './paciente-list.component.css'
})
export class PacienteListComponent {
  pacientes: Ipaciente[] = [];
  loading: boolean = true;

  constructor(private _service: PacienteService){}

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes(): void {
    this._service.getAllPacientes().subscribe((data: Ipaciente[]) =>{
      console.log(data)
      this.pacientes = data;
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  deletePaciente(id: string): void{
    Swal.fire({
              title: '¿Estás seguro?',
              text: 'Esta acción eliminará el paciente de forma permanente.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí, eliminar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                  console.log('ID paciente a eliminar:', id);
                  this._service.deletePaciente(id).subscribe({
                    next: (response) => {
                          console.log('Dato eliminado:', response);
                          this.getPacientes();
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
