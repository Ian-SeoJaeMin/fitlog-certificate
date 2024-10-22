import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ConfigService } from './config/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true })],
    controllers: [AppController],
    providers: [
        ConfigService,
        {
            provide: 'CERTIFICATE_SERVICE',
            useFactory: (configService: ConfigService) => {
                const options = configService.get('service');
                return ClientProxyFactory.create(options);
            },
            inject: [ConfigService]
        }
    ]
})
export class AppModule {}
