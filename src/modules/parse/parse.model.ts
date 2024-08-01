import { Injectable } from '@nestjs/common';
import { Schema, SchemaDefinition } from 'mongoose';
import { BaseModel } from '../base/base.model';
import { DatabaseService } from '../database/database.service';
import { IParseDocument, Statuses } from './types';

const schema: SchemaDefinition = {
  url: {
    type: String,
    required: true,
  },
  words: {
    type: [String],
    required: false,
  },
  status: {
    type: String,
    default: Statuses.CREATED,
  },
};

@Injectable()
export class ParseModel extends BaseModel<IParseDocument> {
  constructor(db: DatabaseService) {
    super(db.connection, new Schema<IParseDocument>(schema), 'parse');
  }
}
