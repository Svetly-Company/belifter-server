import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UploadService } from "./upload.service";

@Injectable() 
export class ChatService {
    constructor(private prisma: PrismaService, private uploadService: UploadService) {}

    async getChats(id : number) {
        const users = await this.prisma.account.findMany({ where: { NOT: { idAccount: id } } });
        const messages = await this.prisma.message.findMany();
        const lastMessagesList = [];
        for(let i = 0; i < users.length; i++) {
            const user = users[i];
            const lastMessage = messages.filter(m =>
                (m.receiverIdAccount == id && m.senderIdAccount == user.idAccount) 
                || (m.receiverIdAccount == user.idAccount && m.senderIdAccount == id)
            ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0] || {content: "", createdAt: ""};
            const mediaLink = await this.uploadService.getImageUrl(user.profilePicture);
            lastMessagesList.push({
                id: user.idAccount,
                name: user.name,
                mediaUrl: mediaLink,
                lastMessageContent: lastMessage.content,
                lastMessageDate: lastMessage.createdAt
            })
        }
        return lastMessagesList;
    }

    async sendMessage(fromId: number, receiveId: number, content: string) {
        const message = await this.prisma.message.create({
            data: {
                createdAt: new Date(),
                content,
                receiverIdAccount: receiveId,
                senderIdAccount: fromId
            }
        })
        return message;
    }

    async getHistory(user1Id: number, user2Id: number) {
        const history = await this.prisma.message.findMany({ where: { 
            OR: [
                {receiverIdAccount: user1Id, senderIdAccount: user2Id,},
                {receiverIdAccount: user2Id, senderIdAccount: user1Id,}
            ]
        }, include: { receiver: { select: { name: true, profilePicture: true, idAccount: true } }, sender: { select: { name: true, profilePicture: true, idAccount: true } } } })
        return history.map(async (u) => {
            if(u.receiver.idAccount == user2Id) {
                const mediaLink = await this.uploadService.getImageUrl(u.receiver.profilePicture);
                return { receiver: { ...u.receiver, profilePicture: mediaLink }, ...u }
            }else if(u.sender.idAccount == user2Id) {
                const mediaLink = await this.uploadService.getImageUrl(u.sender.profilePicture);
                return { sender: { ...u.sender, profilePicture: mediaLink }, ...u }
            }
            return u;
        });
    }   
}  