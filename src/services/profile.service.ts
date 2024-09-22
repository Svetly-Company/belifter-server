import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UploadService } from "./upload.service";

interface ICreatePost {
    content?: string;
    mediaUrl?: string;
    authorId?: number;
}

interface ICommentOnPost {
    content?: string;
    postId?: number;
    authorId?: number;
}

interface ILikeOnPost {
    change?: boolean;
    postId?: number;
    authorId?: number;
}


@Injectable()
export class ProfileService {
    constructor(private database : PrismaService, private uploadService : UploadService) {}

    async getUserInfoById(id : number) {
        const user = await this.database.account.findFirst({ where: { idAccount: id }, include: { Post: true } });
        return {
            username: user.name,
            description: "em briga de cego todo chute é voadora",
            stats: {
                calories: 0,
                steps: 0,
                distance: 0
            },
            posts: user.Post.map(async (p) => {
                const media = await this.uploadService.getImageUrl(p.mediaUrl)
                return { id: p.idPost, content: p.content, mediaUrl: media }
            })
        }
    }
}