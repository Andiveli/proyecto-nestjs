import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Citas } from 'src/entities/citas.entity';
import { CitasController } from 'src/controllers/citas.controller';
import { CitasService } from 'src/services/citas.service';

@Module({
    imports: [TypeOrmModule.forFeature([Citas])],
    controllers: [CitasController],
    providers: [CitasService],
    exports: [TypeOrmModule]
})
export class CitasModule {}
