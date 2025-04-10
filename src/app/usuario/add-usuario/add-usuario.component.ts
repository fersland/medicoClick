import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UsuarioAdd } from '../usuario.models';
import { UsuarioService } from '../usuario.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-add-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatDialogModule,
    MatSelectModule,
    CommonModule,
    MatIconModule],
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.scss'
})
export class AddUsuarioComponent {
  usuarioService = inject(UsuarioService);
  dialogRef = inject(MatDialogRef<AddUsuarioComponent>);
  router = inject(Router);

  private readonly _fbuilder = inject(FormBuilder);

  form = this._fbuilder.group({
    usuario: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    primerNombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    segundoNombre: ['', [Validators.pattern('^[a-zA-Z]+$')]],
    primerApellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    segundoApellido: ['', [Validators.pattern('^[a-zA-Z]+$')]],
    idDepartamento: ['', [Validators.required]],
    idCargo: ['', [Validators.required]]
  })

  formVisible: boolean = true;

  cerrarFormulario() {
    this.formVisible = false;
  }

  cargos: any[] = [];
  departamentos: any[] = [];

  ngOnInit() {
    this.usuarioService.obtenerCargos().subscribe((data) => {
      this.cargos = data;
    });

    this.usuarioService.obtenerDepartamentos().subscribe((data) => {
      this.departamentos = data;
    })
  }

  addUsuario() {
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
  
      console.log('Formulario válido:', user);
  
      this.usuarioService.addUsuarios(user).subscribe(() => {
        console.log("Usuario agregado exitosamente");
        this.dialogRef.close(true); 
        this.form.reset();
      });
    } else {
      console.log("Formulario no válido", this.form);
    }
  }  
  
  cancelar() {
    this.dialogRef.close(false);
  }
}
