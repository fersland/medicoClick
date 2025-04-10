import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IDoctor } from '../../models/idoctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doc-list',
  standalone: true,
  imports: [CommonModule],
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
}
