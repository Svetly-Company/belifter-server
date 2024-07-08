import { Injectable } from "@nestjs/common";
import { createAccountObject } from "src/database/helper";
import { PrismaService } from "src/database/prisma.service";
import { CreateGymSchema } from "src/dtos/create-gym-dto";
import { z } from "zod";

@Injectable()
export class GymService {

    constructor(private readonly database: PrismaService) {}

    getGyms() {
        let gyms = this.database.gym.findMany();
        return gyms;
    }

    async createGym(gymInfo : z.infer<typeof CreateGymSchema>) {
        return this.database.gym.create({
            data: {
                CNPJ: gymInfo.cnpj,
                name: gymInfo.name,
                location: {
                    create: {
                        CEP: gymInfo.location.cep,
                        city: gymInfo.location.city,
                        district: gymInfo.location.district,
                        street: gymInfo.location.street
                    }
                },
                account: {
                    create: createAccountObject({ name: gymInfo.name, password: gymInfo.password, email: gymInfo.email })
                }
            }
        });
    }

}