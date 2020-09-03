import { Injectable } from '@nestjs/common';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {
  getData(): { message: string; info: any } {
    return {
      message: 'Welcome to mull-api!',
      info: { production: environment.production },
    };
  }
}
