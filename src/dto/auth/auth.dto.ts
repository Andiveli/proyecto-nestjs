import { IsNotEmpty, IsString, IsEmail, Min, MinLength } from "class-validator";

export class AuthDto {

    @IsString()
    @IsNotEmpty({message: 'El nombre es requerido'})
    nombre: string;

    @IsString()
    @IsNotEmpty({message: 'El apellido es requerido'})
    apellido: string;

    @IsString()
    @IsEmail({}, {message: 'El email no es valido'})
    @IsNotEmpty({message: 'El email es requerido'})
    email: string;

    @IsString()
    @MinLength(6, {message: 'El password debe tener al menos 6 caracteres'})
    @IsNotEmpty({message: 'El password es requerido'})
    password: string;

    @IsString()
    @IsNotEmpty({message: 'El telefono es requerido'})
    telefono: string;

    admin?: boolean;
    confirmado?: boolean;
    token?: string | null;
}
