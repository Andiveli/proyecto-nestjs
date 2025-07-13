import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './interfaces/auth/auth.interface';
import { AuthEntity } from './entities/auth.entity/auth.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthEntity)
        private authRepository: Repository<AuthEntity>,
    ) {}
    

    getAll() {
        return this.authRepository.find();
    }
    async usuarioConfirmado(email: string){
        const usuario = await this.authRepository.findOne({ where: { email } });
        if(usuario) {
            if(!usuario.confirmado) {
                throw new HttpException('Usuario no confirmado, revisa tu correo', HttpStatus.UNAUTHORIZED);
            }
            return usuario;
        }
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    async comprobarPass(email: string, password: string) : Promise<boolean> {
        const usuario = await this.authRepository.findOne({ where: { email } });
        if(usuario) {
            if(usuario.password === password) {
                return true;
            }
            throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
        }
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    getById(id: number) {
        const usuario = this.authRepository.findOne({ where: { id } });
        if(usuario) {
            return usuario;
        }
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    async getByEmail(email: string) {
        const usuario = await this.authRepository.findOne({ where: { email } });
        if(usuario) {
            return usuario;
        }
        throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    async guardar(usuario: Auth){
        const existe = await this.authRepository.findOne({ where: { email: usuario.email } });
        if(existe) {
            const resultado = await this.authRepository.save(usuario);
            return resultado;
        }
        const nuevoUsuario = this.authRepository.create(usuario);
        const resultado = await this.authRepository.save(nuevoUsuario);
        return resultado;
    }
    async cambiarPass(email: string, password: string) {
        const usuario = await this.authRepository.findOne({ where: { email } });
        if(usuario) {
            usuario.password = password;
            this.authRepository.save(usuario);
            return usuario;
        }
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    async noExisteUser(email: string) {
        const existe = await this.authRepository.findOne({ where: { email } });
        if(existe) {
            throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
        }
        return true;
    }

    async confirmarUsuario(token: string) {
        const usuario = await this.authRepository.findOne({ where: { token } });
        if(usuario) {
            return usuario;
        }
        throw new HttpException('Token inválido o usuario no encontrado', HttpStatus.NOT_FOUND);
    }
}
