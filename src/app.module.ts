import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';

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
    entities: [AuthEntity],
  })],
})
export class AppModule {}
