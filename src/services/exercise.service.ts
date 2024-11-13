/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UploadService } from "./upload.service";

interface iExercises {
    name: string;
    description: string;
    image: string;
}

interface iCreateWorkout {
    name: string;
    description: string;
    image: string;
    image2: string;
    exercises: iExercises[]
}

@Injectable() 
export class ExerciseService {
    constructor(private prisma: PrismaService, private uploadService: UploadService) {}

    async getWorkouts() {
        const workouts = await this.prisma.workout.findMany({ 
            include: { 
                exercises: { 
                    select: { 
                        name: true, 
                        description: true,
                        idExercise: true,
                        image: true
                    } 
                } 
            } 
        });
        const updatedWorkouts = [];
        for(let i = 0; i < workouts.length; i++) {
            const workout = workouts[i];
            const image = await this.uploadService.getImageUrl(workout.image);
            const image3 = await this.uploadService.getImageUrl(workout.image2);
            const newExercises = [];
            for(let j = 0; j < workout.exercises.length; j++) {
                const exercise = workout.exercises[j];
                const image2 = await this.uploadService.getImageUrl(exercise.image);
                newExercises.push({ ...exercise, image: image2 });
            }
            updatedWorkouts.push({...workout, image: image, image2: image3, exercises: newExercises});
        }
        return updatedWorkouts;
    }

    async getWorkoutStats(id: number) {
        return {
            carbo: Math.trunc((22 * (id**2) / id)),
            gordu: Math.trunc((14 * (id**2) / id)),
            protein: Math.trunc((13 * (id**2) / id)),
            calories: Math.trunc((181 * (id**2) / id)),
        }
    }

    async createWorkout(create : iCreateWorkout) {
        await this.prisma.workout.create({
            data: {
                name: create.name,
                description: create.description,
                image: create.image,
                image2: create.image2,
                exercises: {
                    createMany: {
                        data: create.exercises
                    }
                }
            }
        })
    }
}  