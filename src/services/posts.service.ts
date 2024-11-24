/* eslint-disable prettier/prettier */
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
export class PostsService {
    constructor(private database : PrismaService, private upload: UploadService) {}

    async getAllPosts() {
        const posts = await this.database.post.findMany({
            include: {
                Comment: {
                    take: 10,
                    include: {
                        account: true
                    }
                },
                account: true,
                Like: true
            }
        });
        const updatePosts = [];
        for(let i = 0; i < posts.length; i++) {
            const post = posts[i];
            const authorPic = await this.upload.getImageUrl(post.account.profilePicture);
            const media = await this.upload.getImageUrl(post.mediaUrl);
            updatePosts.push({ 
                idPost: post.idPost, 
                content: post.content, 
                media: media, 
                likes: post.Like.length, 
                author: {
                    id: post.account.idAccount,
                    name: post.account.name,
                    profilePicture: authorPic
                },
                comments: post.Comment.map(async comment => {
                    const pic = await this.upload.getImageUrl(comment.account.profilePicture)
                    return ({
                        content: comment.content, 
                        authorName: comment.account.name,
                        authorId: comment.account.idAccount,
                        profilePicture: pic 
                    })
                }) 
            })
        }
        return updatePosts; 
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

    async CommentOnPost({ content, postId, authorId } : ICommentOnPost) {
        const comment = await this.database.comment.create({
            data: {
                content,
                idAccount: authorId,
                postIdPost: postId
            }
        });
        return comment;
    }

    async LikeOnPost({ change, postId, authorId } : ILikeOnPost) {
        const alreadyLiked = await this.database.like.findFirst({
            where: {
                idAccount: authorId,
                postIdPost: postId
            }
        });
        if(alreadyLiked) {
            if(change) return {message: "Already liked"};
            await this.database.like.delete({where: {idLike: alreadyLiked.idLike}})
            return {message: "Like removed!"};
        }
        if(!change) return {message: "Already not liked"};
        await this.database.like.create({data: {
            postIdPost: postId,
            idAccount: authorId
        }})
        return {message: "Liked!"};
    }
}