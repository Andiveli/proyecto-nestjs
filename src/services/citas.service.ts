import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Citas } from "src/entities/citas.entity";
import { Repository } from "typeorm";

@Injectable()
export class CitasService {
    constructor(
        @InjectRepository(Citas)
        private citasRepository: Repository<Citas>,
    ) {}
}