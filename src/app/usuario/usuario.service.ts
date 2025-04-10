import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Usuario, UsuarioAdd } from './usuario.models';
import { Observable } from 'rxjs';
import { Cargo } from './cargo.models';
import { Departamento } from './departamento.models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  private _http = inject(HttpClient);
  private _url = environment.apiURL;

  public obtenerUsuarios(): Observable<Usuario[]>{
    return this._http.get<Usuario[]>(this._url + `/usuarios`);
  }

  public obtenerDepartamentos(): Observable<Departamento[]>{
    return this._http.get<Departamento[]>(this._url + `/departamentos`);
  }

  public obtenerCargos(): Observable<Cargo[]>{
    return this._http.get<Cargo[]>(this._url + `/cargos`);
  }

  public addUsuarios(user: UsuarioAdd){
    return this._http.post(this._url + `/usuarios/store`, user);
  }

  public obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this._http.get<Usuario>(`${this._url}/usuarios/show/${id}`);
  }
  
  public actualizarUsuario(id: number, user: UsuarioAdd): Observable<any> {
    return this._http.put(`${this._url}/usuarios-edit/${id}`, user);
  }

  public eliminarUsuario(id: number): Observable<any> {
    return this._http.delete(`${this._url}/usuarios-del/${id}`);
  }

  obtenerUsuariosPorDepartamento(departamentoId: string): Observable<any[]> {
    return this._http.get<any[]>(`${this._url}/usuarios/sdepartamentos/${departamentoId}`);
  }

  obtenerUsuariosPorCargo(cargoId: string): Observable<any[]> {
    return this._http.get<any[]>(`${this._url}/usuarios/scargos/${cargoId}`);
  }
  
}
