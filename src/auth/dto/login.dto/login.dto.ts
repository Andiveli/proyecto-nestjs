import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsEmail({}, {message: 'El email no es valido'})
    @IsNotEmpty({message: 'El email es requerido'})
    email: string;

    @IsString()
    @IsNotEmpty({message: 'El password es requerido'})
    password: string;
}
