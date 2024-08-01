import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { ParseModule } from '../parse/parse.module';

@Module({
  imports: [ParseModule],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
