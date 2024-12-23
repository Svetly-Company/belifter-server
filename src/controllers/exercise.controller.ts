/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { ChatService } from "src/services/chat.service";
import { ExerciseService } from "src/services/exercise.service";
import { z } from "zod";

const sendMessageDto = z.object({
    content: z.string(),
    receiverId: z.number()
})

@Controller("workout")
export class ExerciseController {
    constructor(private exerciseService: ExerciseService) {}

    @Get()
    async getExercises(@Req() req) {
        const workouts = await this.exerciseService.getWorkouts();
        return workouts;
    }

    @Get('stats')
    async getWorkoutStats(@Req() req) {
        const id = req.user.id;
        const workouts = await this.exerciseService.getWorkoutStats(id);
        return workouts;
    }

    @Post("create")
    async createExercises(@Req() req, @Body() body) {
        this.exerciseService.createWorkout(body);
    }
}