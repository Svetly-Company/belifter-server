import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

interface ICreatePost {
    content?: string;
    mediaUrl?: string;
    authorId?: number;
}

@Injectable()
export class PostsService {
    constructor(private database : PrismaService) {}

    async getAllPosts() {
        const posts = await this.database.post.findMany({
            include: {
                Comment: {
                    take: 10
                },
                Like: true
            }
        });
        return posts.map(post => ({ 
            idPost: post.idPost, 
            content: post.content, 
            media: post.mediaUrl, 
            likes: post.Like.length, 
            comments: post.Comment 
        }));
    }

    async createPost({ content, mediaUrl, authorId } : ICreatePost) {
        const post = await this.database.post.create({
            data: {
                account: {connect: {
                    idAccount: authorId
                }},
                content,
                mediaUrl,
            }
        });
        return post;
    }
}