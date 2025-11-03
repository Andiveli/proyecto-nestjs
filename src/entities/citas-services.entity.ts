import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';
import { Citas } from './citas.entity';
import { Servicios } from './services.entity';

@Entity('citasServicios')
export class CitasServicios {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hora: string;

    @Column()
    cliente: number;

    @Column()
    email: string;

    @Column()
    telefono: string;

    @Column()
    precio: number;

    @ManyToMany(() => Citas, (cita) => cita.citasServicios)
    @JoinColumn({name: 'citaId'})
    citaId: Citas[];

    @ManyToMany(() => Servicios, (servicio) => servicio.citasServicios)
    @JoinColumn({name: 'servicioId'})
    servicioId: Servicios[];
}
