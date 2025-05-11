import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEspecialidades } from '../models/iespecialidades';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private apiURL = environment.apiURL + '/spc';

  constructor(private _http: HttpClient) { }

  getAllspc(): Observable<IEspecialidades[]>{
    return this._http.get<IEspecialidades[]>(this.apiURL);
  }

  crearEspecialidad(spc: IEspecialidades): Observable<any>{
    return this._http.post(`${this.apiURL}/store`, spc);
  }

  getEspecialidadById(id: string): Observable<any>{
    return this._http.get<IEspecialidades>(`${this.apiURL}/show/${id}`);
  }

  updateEspecialidad(spc: IEspecialidades): Observable<any>{
    return this._http.put(`${this.apiURL}/update/${spc.id}`, spc);
  }

  deleteEspecialidad(id: string): Observable<any>{
    return this._http.delete(`${this.apiURL}/destroy/${id}`);
  }
}
