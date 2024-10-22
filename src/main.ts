import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from './config/config.service';

async function bootstrap() {
    const config = new ConfigService();
    const options = config.get('service');

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, options);
    await app.listen();

    Logger.log(`🚀 Application is running on: TCP ${JSON.stringify(options)}`, 'bootstrap-msa');
}
bootstrap();
