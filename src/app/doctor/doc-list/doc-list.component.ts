import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IDoctor } from '../../models/idoctor';
import { DoctorService } from '../../services/doctor.service';
import { RouterLink } from '@angular/router';

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
    if (confirm('¿Estás seguro de que deseas eliminar este doctor?')) {
      this._doctorService.deleteDoctor(id).subscribe({
        next: (response) => {
          console.log('Doctor eliminado:', response);
          this.getDoctores();
          alert('Doctor eliminado correctamente.');
          this.doctores = this.doctores.filter(doctor => String(doctor.id) !== id);
        },
        error: (err) => {
          console.error('Error al eliminar el doctor:', err);
          alert('Error al eliminar el doctor.');
        }
      });
    }
  }
}
