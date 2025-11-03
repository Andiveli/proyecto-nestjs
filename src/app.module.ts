import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CitasModule } from './modules/citas.module.ts';
import { Citas } from './entities/citas.entity';
import { CitasServicios } from './entities/citas-services.entity';
import { Servicios } from './entities/services.entity';

@Module({
  imports: [
    AuthModule,
    CitasModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('DB_TYPE'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        // synchronize: true
        // entities: [AuthEntity, Citas, CitasServicios, Servicios]
        retryDelay: 3000,
      })
    })
  ],
  controllers: [],
})
export class AppModule {}
