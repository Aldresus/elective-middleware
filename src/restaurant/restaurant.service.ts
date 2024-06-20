import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { RestaurantEntity } from './entities/restaurant.entity';
import { config } from 'config';
import { CreateRestaurantCategoryDto } from './dto/create-category';
import {
  AddMenuInCategoryDto,
  AddProductInCategoryDto,
} from './dto/update-category';

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

  async createCategory(
    createRestaurantCategoryDto: CreateRestaurantCategoryDto,
  ): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post<AxiosResponse<RestaurantEntity>>(
        `${this.baseUrl}/restaurantCategory`,
        createRestaurantCategoryDto,
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

  async findByUserId(id_user: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<RestaurantEntity[]>>(
        `${this.baseUrl}/user/${id_user}`,
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

  async addProductCategory(
    addProductInCategoryDto: AddProductInCategoryDto,
  ): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.patch<AxiosResponse<RestaurantEntity>>(
        `${this.baseUrl}/addProductCategory`,
        addProductInCategoryDto,
      ),
    );
    return response.data;
  }

  async addMenuCategory(
    addMenuInCategoryDto: AddMenuInCategoryDto,
  ): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.patch<AxiosResponse<RestaurantEntity>>(
        `${this.baseUrl}/addMenuCategory`,
        addMenuInCategoryDto,
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

  async removeCategory(id_restaurant_category: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.delete<AxiosResponse<RestaurantEntity>>(
        `${this.baseUrl}/category/${id_restaurant_category}`,
      ),
    );
    return response.data;
  }
}
