/* eslint-disable prettier/prettier */
import { Controller, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express"; 
import { Public } from "src/auth/public-key";
import { UploadService } from "src/services/upload.service";

@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService) {}

    @Post('send')
    @Public()
    @UseInterceptors(FileInterceptor('file'))
    async uploadPostMedia(@UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 3000000 })
        ]
    })) file: Express.Multer.File) {
        const filename = await this.uploadService.upload(file.buffer);
        return filename;
    }

    @Post('sendlink')
    @Public()
    @UseInterceptors(FileInterceptor('file'))
    async uploadPostMedia2(@UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 3000000 })
        ]
    })) file: Express.Multer.File) {
        const filename = await this.uploadService.upload(file.buffer);
        const imgUrl = await this.uploadService.getImageUrl(filename);
        return {filename, imgUrl};
    }
}
