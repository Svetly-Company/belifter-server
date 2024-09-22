import { BadRequestException, Injectable } from "@nestjs/common";
import { createAccountObject } from "src/database/helper";
import { PrismaService } from "src/database/prisma.service";
import { CreateGymSchema } from "src/dtos/create-gym-dto";
import { z } from "zod";
import { UploadService } from "./upload.service";

@Injectable()
export class GymService {

    constructor(private readonly database: PrismaService, private readonly uploadService: UploadService) {}

    async getGyms() {
        let gyms = await this.database.gym.findMany();
        
        return gyms.map(async (g) => {
            const mediaUrl = await this.uploadService.getImageUrl(g.profilePicture);
            return { profilePicture: mediaUrl, ...g }
        });
    }

    async createGym(gymInfo : z.infer<typeof CreateGymSchema>) {
        try{
            const gym = await this.database.gym.create({
                data: {
                    CNPJ: gymInfo.cnpj,
                    name: gymInfo.name,
                    profilePicture: gymInfo.mediaUrl,
                    location: {
                        create: {
                            CEP: gymInfo.location.cep,
                            city: gymInfo.location.city,
                            district: gymInfo.location.district,
                            street: gymInfo.location.street
                        }
                    },
                    account: {
                        create: createAccountObject({ name: gymInfo.name, password: gymInfo.password, email: gymInfo.email, mediaUrl: gymInfo.mediaUrl })
                    }
                }
            });
        }catch(e) {
            throw new BadRequestException(e.meta);
        }
    }

}