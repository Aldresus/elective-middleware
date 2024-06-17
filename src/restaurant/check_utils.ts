import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { config } from 'config';
import { lastValueFrom } from 'rxjs';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class CheckUtils {
  private readonly baseUrl: string = config.baseUrl_user_api;
  constructor(private readonly httpService: HttpService) {}

  async getUserRestaurantID(query: { id?: string }): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<AxiosResponse<UserEntity[]>>(this.baseUrl, {
          params: query,
        }),
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
        `${this.baseUrl}/${id}`,
        updateUserDto,
      ),
    );
    return response.data;
  }
}
