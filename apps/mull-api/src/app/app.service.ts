import { Message } from '@mull/types';
import { Injectable } from '@nestjs/common';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {
  getData(): Message {
    return {
      message: 'Welcome to mull-api!',
      info: { production: environment.production },
    };
  }
}
