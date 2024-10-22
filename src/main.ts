import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
    const config = new ConfigService();
    const options = config.get('service');
    const port = config.get('port');

    const app = await NestFactory.create(AppModule);
    app.connectMicroservice<MicroserviceOptions>(options);
    await app.startAllMicroservices();
    await app.listen(port);

    Logger.log(`🚀 Application is running on: TCP ${JSON.stringify(options)} with http ${port} port`, 'bootstrap-hybrid');
}
bootstrap();
