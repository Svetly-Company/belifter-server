import { Module } from '@nestjs/common';
import { GymController } from './controllers/gym.controller';
import { GymService } from './services/gym.service';
import { PrismaService } from './database/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { AccountController } from './controllers/account.controller';
import { AccountModule } from './modules/account.module';
import { AuthService } from './auth/auth.service';
import { AccountService } from './services/account.service';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';

@Module({
  imports: [
    AuthModule,
    AccountModule
  ],
  controllers: [
    GymController,
    PostsController
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
    PostsService
  ],
})
export class AppModule {}
