import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICliente } from '../models/icliente';

@Injectable({
  providedIn: 'root'
})
export class EmpresaClienteService {
  private apiURL = environment.apiURL + '/empresas';

  constructor(private _http: HttpClient) { }

  getAllEmpresasClientes(): Observable<ICliente[]> {
    return this._http.get<ICliente[]>(this.apiURL);
  }

  deleteEmpreasClientes(id: string): Observable<any> {
    return this._http.delete(`${this.apiURL}/destroy/${id}`);
  }

  createEmpresasClientes(clientes: ICliente): Observable<any> {
    return this._http.post(`${this.apiURL}/store`, clientes);
  }

  getByIdEmpresasClientes(id: string): Observable<ICliente> {
    return this._http.get<ICliente>(`${this.apiURL}/show/${id}`);
  }

  updateEmpresasClientes(clientes: ICliente): Observable<any> {
    return this._http.put(`${this.apiURL}/update/${clientes.id}`, clientes);
  }
}
