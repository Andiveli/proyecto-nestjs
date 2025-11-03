import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from '../entities/auth.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity])],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [TypeOrmModule]
})
export class AuthModule {}
