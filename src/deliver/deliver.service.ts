import { Injectable } from '@nestjs/common';
import { CreateDeliverDto } from './dto/create-deliver.dto';
import { UpdateDeliverDto } from './dto/update-deliver.dto';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { DeliverEntity } from './entities/deliver.entity';
import { config } from 'config';

@Injectable()
export class DeliverService {
  private readonly baseUrl: string = config.baseUrl_deliver_api;

  constructor(private readonly httpService: HttpService) {}

  async create(createDeliverDto: CreateDeliverDto): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post<AxiosResponse<DeliverEntity>>(
        this.baseUrl,
        createDeliverDto,
      ),
    );
    return response.data;
  }

  async findMany(query: {
    id_user?: string;
    id_order?: string;
    rating_e?: number;
    rating_gt?: number;
    rating_lt?: number;
  }): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<DeliverEntity[]>>(this.baseUrl, {
        params: query,
      }),
    );
    return response.data;
  }

  async update(
    id_deliver: string,
    updateDeliverDto: UpdateDeliverDto,
  ): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.patch<AxiosResponse<DeliverEntity>>(
        `${this.baseUrl}/${id_deliver}`,
        updateDeliverDto,
      ),
    );
    return response.data;
  }

  async remove(id_deliver: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.delete<AxiosResponse<DeliverEntity>>(
        `${this.baseUrl}/${id_deliver}`,
      ),
    );
    return response.data;
  }
}
