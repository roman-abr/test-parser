import { Injectable } from '@nestjs/common';
import { Connection, createConnection } from 'mongoose';

@Injectable()
export class DatabaseService {
  connection: Connection;

  constructor() {
    this.connection = createConnection(process.env.MONGO_STRING);
  }
}
