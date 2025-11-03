import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { CitasServicios } from './citas-services.entity';

@Entity('servicios')
export class Servicios {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    precio: number;

    @ManyToMany(() => CitasServicios, (citaServicio) => citaServicio.servicioId)
    citasServicios: CitasServicios[];
}
