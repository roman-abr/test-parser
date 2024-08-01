import { Module } from '@nestjs/common';
import { WorkerModule } from './modules/worker/worker.module';
import { DatabaseModule } from './modules/database/database.module';
import { MainModule } from './modules/main/main.module';
import { ParseModule } from './modules/parse/parse.module';

@Module({
  imports: [
    DatabaseModule,
    ParseModule,
    ['ALL', 'WORKER'].includes(process.env.SERVICES) ? WorkerModule : null,
    ['ALL', 'MAIN'].includes(process.env.SERVICES) ? MainModule : null,
  ].filter(Boolean),
  controllers: [],
  providers: [],
})
export class AppModule {}
