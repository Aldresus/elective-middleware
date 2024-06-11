import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { UserEntity } from './entities/user.entity';
import { config } from 'config';

@Injectable()
export class UserService {
  private readonly baseUrl: string = config.baseUrl_user_api;

  constructor(private readonly httpService: HttpService) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post<AxiosResponse<UserEntity>>(
        this.baseUrl,
        createUserDto,
      ),
    );
    return response.data;
  }

  async findMany(query: {
    id?: string;
    first_name?: string;
    last_name?: string;
  }): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<UserEntity[]>>(this.baseUrl, {
        params: query,
      }),
    );
    return response.data;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.patch<AxiosResponse<UserEntity>>(
        `${this.baseUrl}/${id}`,
        updateUserDto,
      ),
    );
    return response.data;
  }

  async remove(id: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.delete<AxiosResponse<UserEntity>>(
        `${this.baseUrl}/${id}`,
      ),
    );
    return response.data;
  }

  async updateRefer(id: string, id_refer: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.patch<AxiosResponse<UserEntity>>(
        `${this.baseUrl}/${id}/refer/${id_refer}`,
      ),
    );
    return response.data;
  }

  async removeRefer(id: string, id_refer: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.delete<AxiosResponse<UserEntity>>(
        `${this.baseUrl}/${id}/refer/${id_refer}`,
      ),
    );
    return response.data;
  }

  async createUserNotifications(
    id: string,
    createNotificationDto: CreateNotificationDto,
  ): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post<AxiosResponse<UserEntity>>(
        `${this.baseUrl}/${id}/notifications`,
        createNotificationDto,
      ),
    );
    return response.data;
  }

  async findUserNotifications(id: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<UserEntity[]>>(
        `${this.baseUrl}/${id}/notifications`,
      ),
    );
    return response.data;
  }
}
