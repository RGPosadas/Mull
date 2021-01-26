import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from 'nestjs-session';
import { join } from 'path';
import { Connection } from 'typeorm';
import { environment } from '../environments/environment';
// Controllers
import { AppController } from './app.controller';
// Services
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EntitiesModule } from './entities';
import { EventModule } from './event/event.module';
import { LocationModule } from './location/location.module';
import { MediaModule } from './media/media.module';
// Modules
import { UserModule } from './user';

@Module({
  imports: [
    UserModule,
    EventModule,
    EntitiesModule,
    MediaModule,
    AuthModule,
    LocationModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: environment.db.host,
      port: 3306,
      username: environment.db.username,
      password: environment.db.password,
      database: environment.production ? 'mull-prod' : 'mull-dev',
      synchronize: true,
      /**
       * Allows entities to be loaded by a sub module.
       */
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/mull-api/src/schema.gql'),
      sortSchema: true,
      /**
       * Access the graphql playground at https://localhost:port/graphql
       */
      playground: !environment.production,
      uploads: {
        maxFileSize: 10000000000000,
      },
      cors: {
        origin: environment.production
          ? environment.client.baseUrl
          : [environment.client.baseUrl, 'https://studio.apollographql.com'],
        credentials: true,
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    SessionModule.forRoot({
      session: {
        name: 'mull-app-session',
        secret: environment.session.secret,
        resave: false,
        saveUninitialized: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
