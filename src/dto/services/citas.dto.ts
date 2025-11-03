import { IsString, IsEmpty, IsNumber, IsBoolean } from "class-validator";

export class CitasDto {
    
    @IsString()
    @IsEmpty({message: 'La fecha es requerida'})
    fecha: string;

    @IsString()
    @IsEmpty({message: 'La hora es requerida'})
    hora: string;

    @IsNumber()
    @IsEmpty({message: 'El ID de usuario es requerido'})
    usuarioId: number;

    @IsBoolean()
    @IsEmpty({message: 'El estado de la cita es requerido'})
    completa: boolean;
}