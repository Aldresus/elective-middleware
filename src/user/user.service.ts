import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReferUserDto } from './dto/refer-user.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UserEntity } from './entities/user.entity';
import { config } from 'config';

@Injectable()
export class UserService {
  private readonly baseUrl: string = config.baseUrl_user_api;

  constructor(private readonly httpService: HttpService) {}

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.post<AxiosResponse<UserEntity>>(
          `${this.baseUrl}/login`,
          { email, password },
        ),
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        // AxiosError contient une réponse
        const { status, data } = error.response;
        console.error('AxiosError:', status, data);

        // Transférez l'erreur en utilisant une exception NestJS appropriée
        throw new HttpException(data, status);
      } else {
        // Autres erreurs (réseau, etc.)
        console.error('Error:', error.message);
        throw new HttpException(
          'An error occurred while processing your request',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post<AxiosResponse<UserEntity>>(
        `${this.baseUrl}/register`,
        createUserDto,
      ),
    );
    return response.data;
  }

  async findMany(query: {
    id?: string;
    first_name?: string;
    last_name?: string;
    role?: string;
  }): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<AxiosResponse<UserEntity[]>>(this.baseUrl, {
          params: query,
        }),
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        // AxiosError contient une réponse
        const { status, data } = error.response;
        console.error('AxiosError:', status, data);

        // Transférez l'erreur en utilisant une exception NestJS appropriée
        throw new HttpException(data, status);
      } else {
        // Autres erreurs (réseau, etc.)
        console.error('Error:', error.message);
        throw new HttpException(
          'An error occurred while processing your request',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
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

  async updateRefer(id: string, referUserDto: ReferUserDto): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.patch<AxiosResponse<UserEntity>>(
        `${this.baseUrl}/${id}/refer`,
        referUserDto,
      ),
    );
    return response.data;
  }

  async removeRefer(id: string, referUserDto: ReferUserDto): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.delete<AxiosResponse<UserEntity>>(
        `${this.baseUrl}/${id}/refer`,
        { data: referUserDto },
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
