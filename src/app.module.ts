import { Module } from '@nestjs/common';
import { GymController } from './controllers/gym.controller';
import { GymService } from './services/gym.service';
import { PrismaService } from './database/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './modules/account.module';
import { AuthService } from './auth/auth.service';
import { AccountService } from './services/account.service';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './services/chat.service';
import { ProfileService } from './services/profile.service';
import { ProfileController } from './controllers/profile.controller';
import { ConfigModule } from '@nestjs/config';
import { UploadService } from './services/upload.service';
import { UploadController } from './controllers/upload.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AccountModule
  ],
  controllers: [
    GymController,
    PostsController,
    ChatController,
    ProfileController,
    UploadController
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    GymService, 
    PrismaService,
    AuthService,
    AccountService,
    PostsService,
    ChatService,
    ProfileService,
    UploadService
  ],
})
export class AppModule {}
