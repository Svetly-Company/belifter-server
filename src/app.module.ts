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

@Module({
  imports: [
    AuthModule,
    AccountModule
  ],
  controllers: [
    GymController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    GymService, 
    PrismaService,
    AuthService,
    AccountService
  ],
})
export class AppModule {}
