import { Controller, Get, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
    constructor(@Inject('CERTIFICATE_SERVICE') private readonly certificateProxy: ClientProxy) {}

    // API Request
    @Get('healthCheck')
    healthCheckAPI(): Observable<string> {
        return this.certificateProxy.send({ cmd: 'healthCheck' }, '');
    }

    // MSA
    @MessagePattern({ cmd: 'healthCheck' })
    healthCheck(): string {
        return 'The server is up and running!';
    }
}
