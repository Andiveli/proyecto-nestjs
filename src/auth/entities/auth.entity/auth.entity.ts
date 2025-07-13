import { text } from "stream/consumers";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('usuarios')
export class AuthEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    telefono: string;
    
    @Column({ default: false })
    admin: boolean;

    @Column({ default: false })
    confirmado: boolean;

    @Column({type:'text', default: null, nullable: true })
    token: string | null;

}