import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { ConfigService } from "@nestjs/config";
import { randomText } from "src/utils";

@Injectable()
export class UploadService {
    private readonly s3Client = new S3Client({ region: this.configService.get("AWS_S3_REGION"), credentials: {
        accessKeyId: "AKIA6JKEYGIC4MFK2BQL",
        secretAccessKey: "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"
    } });

    constructor(private readonly configService: ConfigService) {}

    async getImageUrl(fileName: string) {
        if(!fileName) return "";
        const getCommand = new GetObjectCommand({
            Bucket: "belifter-uploader",
            Key: fileName
        })
        let url = await getSignedUrl(this.s3Client, getCommand, { expiresIn: 60 * 60 * 60})
        return url;
    }

    async upload(file: Buffer) {
        const fileName = randomText(24);
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: "belifter-uploader",
                Key: fileName,
                Body: file,
                ContentType: "image/jpeg"
            })
        )
        return fileName;
    }
}