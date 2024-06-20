import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { LogEntity } from './entities/log.entity';
import { config } from 'config';

@Injectable()
export class LogService {
  private readonly baseUrl: string = config.baseUrl_log_api;

  constructor(private readonly httpService: HttpService) {}

  async create(createLogDto: CreateLogDto): Promise<LogEntity> {
    const response = await lastValueFrom(
      this.httpService.post<LogEntity>(this.baseUrl, createLogDto),
    );
    return response.data;
  }

  async findMany(query: {
    id_log?: string;
    service?: string;
    level?: string;
    page?: number;
    limit?: number;
  }): Promise<LogEntity[]> {
    const response = await lastValueFrom(
      this.httpService.get<LogEntity[]>(this.baseUrl, {
        params: query,
      }),
    );
    return response.data;
  }

  async update(id: string, updateLogDto: UpdateLogDto): Promise<LogEntity> {
    const response = await lastValueFrom(
      this.httpService.patch<LogEntity>(`${this.baseUrl}/${id}`, updateLogDto),
    );
    return response.data;
  }

  async remove(id: string): Promise<LogEntity> {
    const response = await lastValueFrom(
      this.httpService.delete<LogEntity>(`${this.baseUrl}/${id}`),
    );
    return response.data;
  }
}
