import { Body, Controller, Get, Request } from "@nestjs/common";
import { ProfileService } from "src/services/profile.service";

@Controller('profile')
export class ProfileController {
    constructor(private profileService : ProfileService) {}

    @Get('me')
    getAllPosts(@Request() req) {
        const user = req.user;
        return this.profileService.getUserInfoById(user.id);
    }
}