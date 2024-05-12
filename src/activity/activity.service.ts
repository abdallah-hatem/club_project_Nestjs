import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActivityDto } from './dto';
// import { ActivityDto } from './dto';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async getAllActivities() {
    try {
      const activities = await this.prisma.activity.findMany();

      if (!activities) throw new HttpException('Error in database', 500);

      return { result: activities };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async addActivity(dto: ActivityDto) {
    try {
      const { name } = dto;

      const activityFound = await this.isActivityInDB(name);

      if (activityFound)
        throw new HttpException('Activity already in database', 409);

      const newActivity = await this.prisma.activity.create({
        data: {
          name,
        },
      });

      if (!newActivity) throw new HttpException('Error in database', 500);

      return { msg: 'successfully created', newActivity };
    } catch (error) {
      if (error) {
        console.log(error);

        const { message, status } = error;
        throw new HttpException(message, status);
      }
      return error;
    }
  }

  async deleteActivityById(activityId: string) {
    try {
      const id = Number(activityId);
      const deletedActivity = await this.prisma.activity.delete({
        where: { id },
      });

      if (!deletedActivity) throw new HttpException('Error in database', 500);

      return { msg: 'Activity deleted successfully' };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async updateActivityById(dto: ActivityDto, activityId: string) {
    try {
      const { name } = dto;
      const id = Number(activityId);

      const updatedActivity = await this.prisma.activity.update({
        where: { id },
        data: { name },
      });

      if (!updatedActivity) throw new HttpException('Error in database', 500);

      return { msg: 'Activity updated successfully', updatedActivity };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async isActivityInDB(name: string) {
    try {
      const activity = await this.prisma.activity.findMany({
        where: {
          name,
        },
      });

      return activity.length > 0;
    } catch (error) {}
  }
}
