import { BadRequestException, Body, Controller, Get, Post, Request } from "@nestjs/common";
import { CreatePostSchema } from "src/dtos/create-post-dto";
import { PostsService } from "src/services/posts.service";

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
}