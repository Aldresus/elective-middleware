import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { config } from 'config';
import { lastValueFrom } from 'rxjs';
import { DeliverEntity } from 'src/deliver/entities/deliver.entity';
import { CreateLogDto } from 'src/log/dto/create-log.dto';
import { LogEntity } from 'src/log/entities/log.entity';
import { LogService } from 'src/log/log.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class Utils {
  private readonly baseUrl_user_api: string = config.baseUrl_user_api;
  private readonly baseUrl_restaurant_api: string =
    config.baseUrl_restaurant_api;
  private readonly baseUrl_deliver_api: string = config.baseUrl_deliver_api;
  private readonly baseUrl_log_api: string = config.baseUrl_log_api;
  constructor(
    private readonly httpService: HttpService,
    private readonly logService: LogService,
  ) {}

  async getUserByID(query: { id?: string }): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<AxiosResponse<UserEntity[]>>(
          this.baseUrl_user_api,
          {
            params: query,
          },
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

  async setUserRestaurantID(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.patch<AxiosResponse<UserEntity>>(
        `${this.baseUrl_user_api}/${id}`,
        updateUserDto,
      ),
    );
    return response.data;
  }

  async getRestaurantByID(query: { id?: string }): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<AxiosResponse<UserEntity[]>>(
          this.baseUrl_restaurant_api,
          {
            params: query,
          },
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

  async findDeliveriesByIdUser(query: { id_user?: string }): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<DeliverEntity[]>>(
        this.baseUrl_deliver_api,
        {
          params: query,
        },
      ),
    );
    return response.data;
  }

  async addLog(createLogDto: CreateLogDto): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post<LogEntity>(this.baseUrl_log_api, createLogDto),
    );
    return response.data;
  }
}
