import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ICliente } from '../../models/icliente';
import { EmpresaClienteService } from '../../services/empresa-cliente.service';
import Swal from 'sweetalert2';
import { response } from 'express';

@Component({
  selector: 'app-cliente-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent {
  clientesModel: ICliente[] = [];
  loading: boolean = true;

  constructor(private _service: EmpresaClienteService){}

  ngOnInit(): void {
    this.getClientesEmpresas();
  }

  getClientesEmpresas(): void {
    this._service.getAllEmpresasClientes().subscribe((data: ICliente[]) => {
      console.log(data);
      this.clientesModel = data;
      this.loading = false;
    });
  }

  deleteEmpreasClientes(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el registro de forma permamente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        console.log('Registro eliminado:', id);
        this._service.deleteEmpreasClientes(id).subscribe({
          next: (response) => {
            console.log('Dato eliminado: ', response);
            this.getClientesEmpresas();
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Los dato fueron eliminados correctamente.',
              showConfirmButton: false,
              timer: 2000
            });
          },
          error: (err) => {
            console.log('Error al eliminar los datos: ', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Nose pudo eliminar, por favor, intenta nuevamente.',
              showConfirmButton: false,
              timer: 2000
            });
          }
        });
      }
    });
  }

}
