import { Component, inject } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../usuario.models';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarDialog } from '../confirmar-dialog/confirmar-dialog.component';
import { AddUsuarioComponent } from '../add-usuario/add-usuario.component';
import { EditUsuarioComponent } from '../edit-usuario/edit-usuario.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [MatButtonModule, 
    MatToolbarModule, 
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    FormsModule
    ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  usuarioService = inject(UsuarioService);
  dialog = inject(MatDialog);
  usuarios?: Usuario[];
  departamentos: any[] = [];
  cargos: any[] = [];
  selectedDepartment: string = '';
  selectedCargo: string = '';
  columnasAMostrar = ["usuario", "nombres", "apellidos",  "idDepartamento", "idCargo", "email", "acciones"]

  constructor() {
    this.cargarUsuarios();
    this.cargarDepartamentos();
    this.cargarCargos();
  }

  cargarDepartamentos() {
    this.usuarioService.obtenerDepartamentos().subscribe((data) => {
      this.departamentos = data;
    });
  }

  cargarCargos(){
    this.usuarioService.obtenerCargos().subscribe((data) => {
      this.cargos = data;
    })
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  filtrarUsuariosPorDepartamento() {
    if (this.selectedDepartment) {
      this.usuarioService.obtenerUsuariosPorDepartamento(this.selectedDepartment).subscribe((usuarios) => {
        this.usuarios = usuarios;
      });
    } else {
      this.cargarUsuarios();
    }
  }

  filtrarUsuariosPorCargo() {
    if (this.selectedCargo) {
      this.usuarioService.obtenerUsuariosPorCargo(this.selectedCargo).subscribe((usuarios) => {
        this.usuarios = usuarios;
      });
    } else {
      this.cargarUsuarios();
    }
  }

  confirmarEliminacion(id: number) {
    const dialogRef = this.dialog.open(ConfirmarDialog, {
      data: { mensaje: '¿Está seguro de que desea eliminar este usuario?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.eliminarUsuario(id).subscribe(() => {
          this.cargarUsuarios();
        });
      }
    });
  }

  abrirModalCrearUsuario() {
    const dialogRef = this.dialog.open(AddUsuarioComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarUsuarios();
      }
    });
  }

  abrirModalEditarUsuario(id: number) {
    console.log('ID que se pasa al modal:', id);
  
    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      width: '600px',
      data: { id: id },
      panelClass: 'custom-dialog',
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarUsuarios();
      }
    });
  }
  
}
