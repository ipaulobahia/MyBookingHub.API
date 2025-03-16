import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Injectable()
export class AuthService {
  private readonly authUrl: string;

  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly httpService: HttpService
  ) {
    if (!this.configService.url?.auth) {
      throw new Error('AUTH URL is not defined in the configuration.');
    }

    this.authUrl = this.configService.url.auth;
  }

  async getBusinessById(businessId: string) {
    try {
      const response = await this.httpService.get(`${this.authUrl}/business/${businessId}`).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: string) {
    try {
      const response = await this.httpService.get(`${this.authUrl}/users/${userId}`).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
}