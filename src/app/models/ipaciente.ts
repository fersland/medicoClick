export interface Ipaciente {
    id: string;
    identificacion: string;
    primerNombre: string;
    segundoNombre?: string;
    primerApellido: string;
    segundoApellido?: string;
    email: string;
    activo: boolean;
    telefono: string;
    direccion: string;
    fechaNacimiento: Date;
    sexo: Sexo;
}

export enum Sexo {
  Masculino = 'M',
  Femenino = 'F',
  Otro = 'O'
}

