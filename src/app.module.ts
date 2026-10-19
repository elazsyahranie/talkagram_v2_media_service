import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
// import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
// import { APP_GUARD } from '@nestjs/core';
// import { MyLoggerModule } from './my-logger/my-logger.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger/winston.config';
// import { ExceptionsFilter } from './common/exceptions.filter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RedisModule } from './redis.module';
// import { GrpcsExceptionFilter } from './common/grpc-exceptions.filter';
// import { APP_FILTER } from '@nestjs/core';
import { UserImagesService } from './user_images/user_images.service';
import { UserImagesController } from './user_images/user_images.controller';
import { UserImagesModule } from './user_images/user_images.module';
// import { AttachmentFilesService } from './attached_files/attached_files.service';
// import { AttachmentFilesController } from './attached_files/attached_files.controller';
// import { AttachedFilesModule } from './attached_files/attached_files.module';
import { AttachmentFilesService } from './attachment_files/attachment_files.service';
import { AttachmentFilesController } from './attachment_files/attachment_files.controller';
import { AttachmentFilesModule } from './attachment_files/attachment_files.module';

@Module({
  imports: [
    DatabaseModule,
    CommonModule,
    WinstonModule.forRoot(winstonConfig),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      // rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    // ThrottlerModule.forRoot([
    //   { name: 'short', ttl: 1000, limit: 3 },
    //   { name: 'long', ttl: 60000, limit: 3 },
    // ]),
    // MyLoggerModule,
    AuthModule,
    RedisModule,
    UserImagesModule,
    AttachmentFilesModule,
  ],
  controllers: [AppController, UserImagesController, AttachmentFilesController],
  providers: [
    AppService,
    UserImagesService,
    AttachmentFilesService,
    // { provide: APP_GUARD, useClass: ThrottlerGuard } Activates the throttle
    // {
    //   provide: APP_FILTER,
    //   useClass: ExceptionsFilter,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: GrpcsExceptionFilter,
    // },
  ],
  exports: [WinstonModule],
})
export class AppModule {}
