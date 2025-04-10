import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  selector: 'app-confirmar-dialog',
  template: `
    <h1 mat-dialog-title>Confirmación</h1>
    <div mat-dialog-content>
      <p>{{ data.mensaje }}</p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="onCancelar()">Cancelar</button>
      <button mat-button color="warn" (click)="onConfirmar()">Eliminar</button>
    </div>
  `,
})
export class ConfirmarDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string }
  ) {}

  onCancelar(): void {
    this.dialogRef.close(false);
  }

  onConfirmar(): void {
    this.dialogRef.close(true);
  }
}
