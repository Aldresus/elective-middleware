import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

import { config } from 'config';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {
  private readonly baseUrl: string = config.baseUrl_order_api;

  constructor(private readonly httpService: HttpService) {}

  async create(createOrderDto: CreateOrderDto): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post<AxiosResponse<OrderEntity>>(
        this.baseUrl,
        createOrderDto,
      ),
    );
    return response.data;
  }

  async findById(id_order: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<OrderEntity>>(
        `${this.baseUrl}/${id_order}`,
      ),
    );
    return response.data;
  }

  async findMany(query: {
    id_order?: string;
    id_restaurateur?: string;
    id_user?: string;
    status?: string;
  }): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<OrderEntity[]>>(this.baseUrl, {
        params: query,
      }),
    );
    return response.data;
  }

  async update(id_order: string, updateOrderDto: UpdateOrderDto): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.patch<AxiosResponse<OrderEntity>>(
        `${this.baseUrl}/${id_order}`,
        updateOrderDto,
      ),
    );
    return response.data;
  }

  async remove(id_order: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.delete<AxiosResponse<OrderEntity>>(
        `${this.baseUrl}/${id_order}`,
      ),
    );
    return response.data;
  }
}
