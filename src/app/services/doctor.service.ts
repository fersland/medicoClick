import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDoctor } from '../models/idoctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiURL = environment.apiURL + '/doctores';

  constructor(private _http: HttpClient) { }

  getAllDoctores(): Observable<IDoctor[]> {
    return this._http.get<IDoctor[]>(this.apiURL);
  }

  createDoctores(doctor: IDoctor): Observable<any>{
    return this._http.post(`${this.apiURL}/store`, doctor);
  }

}
