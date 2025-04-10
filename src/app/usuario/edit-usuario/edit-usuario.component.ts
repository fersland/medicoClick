import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsuarioAdd } from '../usuario.models';
import { UsuarioService } from '../usuario.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatIconModule],
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss'],
})
export class EditUsuarioComponent implements OnInit {
  usuarioService = inject(UsuarioService);
  dialogRef = inject(MatDialogRef<EditUsuarioComponent>);

  private readonly _fbuilder = inject(FormBuilder);
  cargos: any[] = [];
  departamentos: any[] = [];
  id: number;

  form = this._fbuilder.group({
    usuario: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    primerNombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
    segundoNombre: ['', [Validators.pattern('^[a-zA-Z ]+$')]],
    primerApellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
    segundoApellido: ['', [Validators.pattern('^[a-zA-Z ]+$')]],
    idDepartamento: [''],
    idCargo: [''],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.id = data.id;
  }

  ngOnInit() {
    console.log('ID recibida en el modal:', this.id);
    this.cargarDatos();
  }
  
  cargarDatos() {
    const departamentos$ = this.usuarioService.obtenerDepartamentos();
    const cargos$ = this.usuarioService.obtenerCargos();
  
    Promise.all([departamentos$.toPromise(), cargos$.toPromise()]).then(
      ([departamentos, cargos]) => {
        this.cargos = cargos!;
        this.departamentos = departamentos!;
        this.cargarUsuario();
      }
    );
  }
  
  cargarUsuario() {
    this.usuarioService.obtenerUsuarioPorId(this.id).subscribe((user) => {
      if (user) {
        console.log('Usuario recibido:', user);
      console.log('Departamento ID:', user.idDepartamento);
      console.log('Cargo ID:', user.idCargo);

        this.form.patchValue({
          usuario: user.usuario,
          email: user.email,
          primerNombre: user.primerNombre,
          segundoNombre: user.segundoNombre,
          primerApellido: user.primerApellido,
          segundoApellido: user.segundoApellido,
          idDepartamento: user.idDepartamento,
          idCargo: user.idCargo,
        });
      }
    });
  }
  

  actualizarUsuario() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const user: UsuarioAdd = {
        usuario: formValue.usuario!,
        email: formValue.email!,
        primerNombre: formValue.primerNombre!,
        segundoNombre: formValue.segundoNombre!,
        primerApellido: formValue.primerApellido!,
        segundoApellido: formValue.segundoApellido!,
        idDepartamento: formValue.idDepartamento!,
        idCargo: formValue.idCargo!,
      };

      this.usuarioService.actualizarUsuario(this.id, user).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      console.log("Formulario no válido", this.form);
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
