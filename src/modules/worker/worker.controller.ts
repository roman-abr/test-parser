import { WorkerService } from './worker.service';
import { queue } from '../config/queue.constant';
import { IParseDocument } from '../parse/types';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class WorkerController {
  constructor(private service: WorkerService) {}

  @MessagePattern(queue)
  async process(@Payload() data: IParseDocument): Promise<void> {
    await this.service.parse(data);
  }
}
