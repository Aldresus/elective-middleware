import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ProductEntity } from './entities/product.entity';
import { config } from 'config';

@Injectable()
export class ProductService {
  private readonly baseUrl: string = config.baseUrl_product_api;

  constructor(private readonly httpService: HttpService) {}

  async create(createProductDto: CreateProductDto): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post<AxiosResponse<ProductEntity>>(
        this.baseUrl,
        createProductDto,
      ),
    );
    return response.data;
  }

  async findMany(query: {
    id_restaurant?: string;
    deleted?: string;
  }): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<ProductEntity[]>>(this.baseUrl, {
        params: query,
      }),
    );
    return response.data;
  }

  async findUnique(id_product: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<ProductEntity[]>>(
        `${this.baseUrl}/${id_product}`,
      ),
    );
    return response.data;
  }

  async update(
    id_product: string,
    updateProductDto: UpdateProductDto,
  ): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.patch<AxiosResponse<ProductEntity>>(
        `${this.baseUrl}/${id_product}`,
        updateProductDto,
      ),
    );
    return response.data;
  }

  async remove(id_product: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.delete<AxiosResponse<ProductEntity>>(
        `${this.baseUrl}/${id_product}`,
      ),
    );
    return response.data;
  }
}
