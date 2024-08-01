import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ParseModel } from '../parse/parse.model';
import { IParseDocument, Statuses, TIdResponse } from '../parse/types';
import { queue } from '../config/queue.constant';
import { join } from 'path';
import * as pdf from 'pdfkit';
import { readFile } from 'fs/promises';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MainService {
  private model: ParseModel;
  private client: ClientProxy;
  constructor(@Inject('REDIS_PUB') client: ClientProxy, model: ParseModel) {
    this.model = model;
    this.client = client;
  }

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  async create(body: IParseDocument): Promise<TIdResponse> {
    const doc = await this.model.save(body);
    // this.client.
    await this.client.emit(queue, doc);
    return { id: doc._id };
  }

  async list(): Promise<Partial<IParseDocument>[]> {
    const docs = await this.model.find({});
    return docs;
  }

  async getOne(id: string): Promise<Partial<IParseDocument>> {
    const doc = await this.model.findOne(id);
    if (!doc) {
      throw new NotFoundException('Document not found');
    }
    return doc;
  }

  async getPdf(id: string): Promise<Buffer> {
    const doc = await this.getOne(id);
    if (doc.status !== Statuses.FINISHED) {
      throw new BadRequestException('Wrong status');
    }
    const words = doc.words;
    const fontPath = 'misc/Alice-Regular.ttf';
    // const font = await readFile(join(__dirname, '../../../', fontPath));
    return new Promise((resolve) => {
      const doc = new pdf({
        bufferPages: true,
      });
      // doc.font(font).fontSize(15);

      for (const word of words) {
        doc.moveDown();
        doc.text(word);
      }

      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });
  }
}
