import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ParseModel } from './parse.model';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [ParseModel],
  exports: [ParseModel],
})
export class ParseModule {}
