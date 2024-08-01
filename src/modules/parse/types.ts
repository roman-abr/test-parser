import { Document } from 'mongoose';

export interface IParseDocument extends Document {
  url: string;
  words?: string[];
  status: Statuses;
}

export type TIdResponse = { id: string };

export const enum Statuses {
  CREATED = 'created',
  IN_PROCESS = 'in_process',
  FINISHED = 'finished',
  FAILED = 'failed',
}
