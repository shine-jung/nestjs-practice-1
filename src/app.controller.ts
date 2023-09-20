import { Controller, Get, Logger, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  // DI가 아니므로 클래스에 인스턴스를 직접 생성
  // LoggerService는 interface, Logger는 type만 명시된 declare class이므로 직접 생성해야 함.
  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(@Ip() ip: string): string {
    console.log(this.configService.get('ENVIRONMENT'));
    console.log(ip);
    this.logger.log(ip);
    this.logger.debug(ip);
    this.logger.error(ip);
    this.logger.warn(ip);
    this.logger.verbose(ip);
    this.logger.fatal(ip);
    return this.appService.getHello();
    // throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Get('name')
  getName(@Query('name') name: string): string {
    return `Hello ${name}!`;
  }
}
