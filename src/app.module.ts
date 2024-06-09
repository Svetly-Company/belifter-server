import { Module } from '@nestjs/common';
import { GymController } from './controllers/gym.controller';
import { GymService } from './services/gym.service';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [],
  controllers: [GymController],
  providers: [GymService, PrismaService],
})
export class AppModule {}
