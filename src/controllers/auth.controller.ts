import { Body, Controller, Get, Param, Post, Res, HttpStatus, HttpCode, HttpException } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { AuthDto } from '../dto/auth/auth.dto';
import { LoginDto } from '../dto/auth/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async registrarUsuario(@Body() body: AuthDto) : Promise<{msg: string}> {
        const { nombre, apellido, email, password, telefono } = body;
        this.authService.noExisteUser(email);
        const nuevoUsuario = {
            nombre,
            apellido,
            email,
            password,
            telefono,
        };
        this.authService.guardar(nuevoUsuario);
        return ({msg: 'Usuario registrado'});
    }
    
    @Get('confirmar/:token')
    @HttpCode(HttpStatus.OK)
    async confirmarUsuario(@Param('token') token: string ) {
        const usuarioConfirmar = await this.authService.confirmarUsuario(token);
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        this.authService.guardar(usuarioConfirmar);
        return ({msg: 'Usuario confirmado correctamente'});
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async autenticar(@Body() body: LoginDto) {
        const { email, password } = body;
        const usuario = await this.authService.usuarioConfirmado(email);
        if(await this.authService.comprobarPass(email, password)) {
            return ({
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                telefono: usuario.telefono,
            });
        } else {
            const error = new Error('Contraseña incorrecta');
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
        }
    }

    @Post('olvide-password')
    @HttpCode(HttpStatus.OK)
    async olvidePassword(@Body('email') email : string) {
        const usuario = await this.authService.getByEmail(email);
        usuario.token = Math.floor(Math.random() * 1000000).toString();
        this.authService.guardar(usuario);
        return ({msg: 'Se ha enviado un correo con las instrucciones para restablecer la contraseña'});
    }

    @Get('olvide-password/:token')
    @HttpCode(HttpStatus.OK)
    async comprobarTokenOlvido( @Param('token') token: string ) {
        await this.authService.confirmarUsuario(token);
        return ({msg: 'Coloca tu nueva contraseña'});
    }

    @Post('olvide-password/:token')
    @HttpCode(HttpStatus.OK)
    async nuevoPassword( @Param('token') token: string, @Body('password') password: string ) {
        const usuario = await this.authService.confirmarUsuario(token);
        usuario.token = null;
        usuario.password = password;
        this.authService.guardar(usuario);
        return ({msg: 'Contraseña actualizada correctamente'});
    }
}
