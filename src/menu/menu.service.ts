import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { MenuEntity } from './entities/menu.entity'; // Assurez-vous d'avoir cette entité
import { config } from 'config';
import {
  UpdateCategoryDto,
  UpdateProductCategoryDto,
} from './dto/update-category';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category';

@Injectable()
export class MenuService {
  private readonly baseUrl: string = config.baseUrl_menu_api;

  constructor(private readonly httpService: HttpService) {}

  async create(createMenuDto: CreateMenuDto) {
    const response = await lastValueFrom(
      this.httpService.post<AxiosResponse<MenuEntity>>(
        this.baseUrl,
        createMenuDto,
      ),
    );
    return response.data;
  }

  async getById(id_menu: string) {
    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<MenuEntity>>(
        `${this.baseUrl}/${id_menu}`,
      ),
    );
    return response.data;
  }

  async findMany(id_restaurant?: string) {
    const params: any = {};
    if (id_restaurant) params.id_restaurant = id_restaurant;

    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<MenuEntity[]>>(this.baseUrl, {
        params,
      }),
    );

    console.log(response.data);

    return response.data;
  }

  async update(id_menu: string, updateMenuDto: UpdateMenuDto) {
    const response = await lastValueFrom(
      this.httpService.patch<AxiosResponse<MenuEntity>>(
        `${this.baseUrl}/${id_menu}`,
        updateMenuDto,
      ),
    );
    return response.data;
  }

  async remove(id_menu: string) {
    const response = await lastValueFrom(
      this.httpService.delete<AxiosResponse<MenuEntity>>(
        `${this.baseUrl}/${id_menu}`,
      ),
    );
    return response.data;
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const response = await lastValueFrom(
      this.httpService.post<AxiosResponse<CategoryEntity>>(
        `${this.baseUrl}/category`,
        createCategoryDto,
      ),
    );
    return response.data;
  }

  async updateCategory(updateProductCategoryDto: UpdateProductCategoryDto) {
    const response = await lastValueFrom(
      this.httpService.patch<AxiosResponse<CategoryEntity>>(
        `${this.baseUrl}/productCategory`,
        updateProductCategoryDto,
      ),
    );
    return response.data;
  }

  async removeCategory(id_category: string) {
    const response = await lastValueFrom(
      this.httpService.delete<AxiosResponse<MenuEntity>>(
        `${this.baseUrl}/category/${id_category}`,
      ),
    );
    return response.data;
  }
}
