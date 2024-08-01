import { Module } from '@nestjs/common';
import { ParseModule } from '../parse/parse.module';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REDIS_PUB',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        },
      },
    ]),
    ParseModule,
  ],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
