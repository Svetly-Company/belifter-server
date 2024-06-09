import { Injectable } from "@nestjs/common";
import { createHash } from "crypto";
import { PrismaService } from "src/database/prisma.service";
import { CreateGymBody } from "src/dtos/create-gym-dto";

@Injectable()
export class GymService {

    constructor(private readonly database: PrismaService) {}

    getGyms() {
        let gyms = this.database.gym.findMany();
        return gyms;
    }

    async createGym(gymInfo : CreateGymBody) {

        const { password } = gymInfo;

        const hashPassword = createHash('sha256').update(password).digest('base64');

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
                user: {
                    create: {
                        name: gymInfo.name,
                        password: hashPassword,
                        profilePicture: "none"
                    }
                }
            }
        });
    }

}