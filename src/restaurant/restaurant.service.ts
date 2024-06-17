import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { RestaurantEntity } from './entities/restaurant.entity';
import { config } from 'config';

@Injectable()
export class RestaurantService {
  private readonly baseUrl: string = config.baseUrl_restaurant_api;

  constructor(private readonly httpService: HttpService) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post<AxiosResponse<RestaurantEntity>>(
        this.baseUrl,
        createRestaurantDto,
      ),
    );
    return response.data;
  }

  async findMany(query: {
    name?: string;
    city?: string;
    price_range?: string;
    category?: string;
    rating_e?: number;
    rating_gt?: number;
    rating_lt?: number;
  }): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<RestaurantEntity[]>>(this.baseUrl, {
        params: query,
      }),
    );
    return response.data;
  }

  async findById(id_restaurant: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<RestaurantEntity>>(
        `${this.baseUrl}/${id_restaurant}`,
      ),
    );
    return response.data;
  }

  async update(
    id_restaurant: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.patch<AxiosResponse<RestaurantEntity>>(
        `${this.baseUrl}/${id_restaurant}`,
        updateRestaurantDto,
      ),
    );
    return response.data;
  }

  async remove(id_restaurant: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.delete<AxiosResponse<RestaurantEntity>>(
        `${this.baseUrl}/${id_restaurant}`,
      ),
    );
    return response.data;
  }
}
