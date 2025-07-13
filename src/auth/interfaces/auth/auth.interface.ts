export interface Auth {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    telefono: string;
    admin?: boolean;
    confirmado?: boolean;
    token?: string | null;
}