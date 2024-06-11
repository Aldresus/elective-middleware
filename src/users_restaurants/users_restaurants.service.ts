import { Injectable } from '@nestjs/common';
import { CreateUsersRestaurantDto } from './dto/create-users_restaurant.dto';
import { UpdateUsersRestaurantDto } from './dto/update-users_restaurant.dto';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { UsersRestaurantEntity } from './entities/users_restaurant.entity';
import { config } from 'config';

@Injectable()
export class UsersRestaurantsService {
  private readonly baseUrl: string = config.baseUrl_users_restaurants_api;

  constructor(private readonly httpService: HttpService) {}

  async create(
    createUsersRestaurantDto: CreateUsersRestaurantDto,
  ): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post<AxiosResponse<UsersRestaurantEntity>>(
        this.baseUrl,
        createUsersRestaurantDto,
      ),
    );
    return response.data;
  }

  async findMany(query: {
    id_user?: string;
    id_restaurant?: string;
  }): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<UsersRestaurantEntity[]>>(
        this.baseUrl,
        {
          params: query,
        },
      ),
    );
    return response.data;
  }

  async update(
    id: string,
    updateUsersRestaurantDto: UpdateUsersRestaurantDto,
  ): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.patch<AxiosResponse<UsersRestaurantEntity>>(
        `${this.baseUrl}/${id}`,
        updateUsersRestaurantDto,
      ),
    );
    return response.data;
  }

  async remove(id: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.delete<AxiosResponse<UsersRestaurantEntity>>(
        `${this.baseUrl}/${id}`,
      ),
    );
    return response.data;
  }
}
