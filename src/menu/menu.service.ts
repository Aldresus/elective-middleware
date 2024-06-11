import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { MenuEntity } from './entities/menu.entity'; // Assurez-vous d'avoir cette entité
import { config } from 'config';

@Injectable()
export class MenuService {
  private readonly baseUrl: string = config.baseUrl_menu_api;

  constructor(private readonly httpService: HttpService) {}

  async create(createMenuDto: CreateMenuDto): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post<AxiosResponse<MenuEntity>>(
        this.baseUrl,
        createMenuDto,
      ),
    );
    return response.data;
  }

  async findMany(id_restaurant?: string, deleted?: string): Promise<any> {
    const params: any = {};
    if (id_restaurant) params.id_restaurant = id_restaurant;
    if (deleted) params.deleted = deleted;

    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<MenuEntity[]>>(this.baseUrl, {
        params,
      }),
    );
    return response.data;
  }

  async update(id_menu: string, updateMenuDto: UpdateMenuDto): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.patch<AxiosResponse<MenuEntity>>(
        `${this.baseUrl}/${id_menu}`,
        updateMenuDto,
      ),
    );
    return response.data;
  }

  async remove(id_menu: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.delete<AxiosResponse<MenuEntity>>(
        `${this.baseUrl}/${id_menu}`,
      ),
    );
    return response.data;
  }
}
