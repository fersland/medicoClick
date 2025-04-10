export interface IDoctor {
    id: number;
    identificacion: string;
    primerNombre: string;
    segundoNombre?: string;
    primerApellido: string;
    segundoApellido?: string;
    email: string;
    activo: boolean;
    telefono: string;
    direccion: string;
}
