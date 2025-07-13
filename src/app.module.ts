import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '2005T@bleplus',
    database: 'appsalon',
    autoLoadEntities: true,
    // synchronize: true,
  })],
})
export class AppModule {}
