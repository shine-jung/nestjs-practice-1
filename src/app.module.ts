import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './routes/board/board.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import ConfigModule from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './routes/user/user.module';

@Module({
  imports: [
    ConfigModule(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_NAME || 'postgres',
      // 빌드 시 js로 변환 후 실행되므로 js 파일도 포함
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // 작성된 entity와 DB의 스키마를 동기화
      synchronize: false, // dev 환경에서 entity 수정 시 자동으로 반영하고 싶으면 true로 변경
      logging: true,
    }),
    BoardModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 미들웨어 등록
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
