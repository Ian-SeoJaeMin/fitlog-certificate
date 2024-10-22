import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
    @MessagePattern({ cmd: 'healthCheck' })
    healthCheck(): string {
        return 'The server is up and running!';
    }
}
