import { BadRequestException, Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { ChatService } from "src/services/chat.service";
import { z } from "zod";

const sendMessageDto = z.object({
    content: z.string(),
    receiverId: z.number()
})

@Controller("chat")
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Get()
    async getChats(@Req() req) {
        const user = req.user;
        const chat = await this.chatService.getChats(user.id);
        return chat;
    }

    @Get(":id")
    async getMessageHistory(@Req() req, @Param('id') id : string) {
        const user = req.user;
        const history = this.chatService.getHistory(user.id, Number(id));
        return history;
    }

    @Post("send")
    async sendMessage(@Req() req, @Body() body) {
        const {success, data, error} = sendMessageDto.safeParse(body);
        if(!success) throw new BadRequestException(error);
        const user = req.user;
        const { receiverId, content } = data;
        const result = await this.chatService.sendMessage(user.id, receiverId, content);
        return result;
    }
}