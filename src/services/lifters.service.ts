/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PrismaService } from "src/database/prisma.service";
import { UploadService } from "./upload.service";

@Injectable()
export class LifterService {

    constructor(private readonly database: PrismaService, private readonly uploadService: UploadService) {}

    async getUsers() {
        let users = await this.database.account.findMany();
        let updatedGyms = [];
        for(let i = 0; i < users.length; i++) {
            const gym = users[i];
            let imageUrl = await this.uploadService.getImageUrl(gym.profilePicture);
            updatedGyms.push({
                id: gym.idAccount,
                name: gym.name,
                profilePicture: imageUrl,
                email: gym.email 
            });
        }
        return updatedGyms;
    }

}