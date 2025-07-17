import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ipaciente } from '../models/ipaciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = environment.apiURL + '/pacientes';

  constructor(private _http: HttpClient) { }

  getAllPacientes(): Observable<Ipaciente[]> {
    return this._http.get<Ipaciente[]>(this.apiUrl);
  }

  createPaciente(paciente: Ipaciente): Observable<any>{
    return this._http.post(`${this.apiUrl}/store`, paciente);
  }

  getPacienteById(id: string): Observable<Ipaciente>{
    return this._http.get<Ipaciente>(`${this.apiUrl}/show/${id}`);
  }

  updatePaciente(paciente: Ipaciente): Observable<any> {
    return this._http.put(`${this.apiUrl}/update/${paciente.id}`, paciente);
  }

  deletePaciente(id: string): Observable<any>{
    return this._http.delete(`${this.apiUrl}/destroy/${id}`);
  }

}
