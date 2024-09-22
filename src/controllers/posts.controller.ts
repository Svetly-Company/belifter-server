import { BadRequestException, Body, Controller, Get, Param, Post, Request } from "@nestjs/common";
import { CommentPostSchema, LikePostSchema } from "src/dtos/comment-post-dto";
import { CreatePostSchema } from "src/dtos/create-post-dto";
import { PostsService } from "src/services/posts.service";
import { UploadService } from "src/services/upload.service";

@Controller('posts')
export class PostsController {
    constructor(private postService : PostsService) {}

    @Get('all')
    getAllPosts() {
        return this.postService.getAllPosts();
    }

    @Post('create')
    createPost(@Body() body, @Request() req) {
        const {success, data, error} = CreatePostSchema.safeParse(body);
        if(!success) throw new BadRequestException(error);
        return this.postService.createPost({...data, authorId: req.user.id});
    }

    @Post(':id/comments/create')
    commentOnPost(@Param('id') id : string, @Body() body, @Request() req) {
        const {success, data, error} = CommentPostSchema.safeParse(body);
        if(!success) throw new BadRequestException(error);
        return this.postService.CommentOnPost({ content: data.content, postId: Number(id), authorId: req.user.id})
    }

    @Post(':id/likes/change')
    changeLikeState(@Param('id') id : string, @Body() body, @Request() req) {
        const {success, data, error} = LikePostSchema.safeParse(body);
        if(!success) throw new BadRequestException(error);
        return this.postService.LikeOnPost({ change: data.changeTo, postId: Number(id), authorId: req.user.id})
    }
}