import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { AuthEntity } from "./auth.entity";
import { CitasServicios } from "./citas-services.entity";

@Entity('citas')
export class Citas {
    @PrimaryColumn()
    id: number;

    @Column()
    fecha: string;

    @Column()
    hora: string;

    @ManyToMany(() => AuthEntity, (usuario) => usuario.citas)
    @JoinColumn({name: 'usuarioId'})
    usuarioId: AuthEntity[];

    @Column()
    completa: boolean;

    @ManyToMany(() => CitasServicios, (citaServicio) => citaServicio.citaId)
    citasServicios: CitasServicios[];
}
