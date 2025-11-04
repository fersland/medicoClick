export interface IDoctor {
    id: string;
    id_empresa: string;
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
