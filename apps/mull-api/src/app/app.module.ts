import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { SessionModule } from 'nestjs-session';
import { Connection } from 'typeorm';
import { join } from 'path';

// Controllers
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';

// Modules
import { UserModule } from './user';
import { EventModule } from './event/event.module';
import { EntitiesModule } from './entities';
import { MediaModule } from './media/media.module';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    EventModule,
    EntitiesModule,
    MediaModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: environment.db.host,
      port: 3306,
      username: environment.db.username,
      password: environment.db.password,
      database: 'mull',
      synchronize: !environment.production,
      /**
       * Allows entities to be loaded by a sub module.
       */
      autoLoadEntities: true,
      logging: true,
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
