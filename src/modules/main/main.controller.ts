import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { BodyParse } from 'src/body.decorator';
import { MainService } from './main.service';
import { IParseDocument, TIdResponse } from '../parse/types';

@Controller('parse')
export class MainController {
  constructor(private service: MainService) {}

  @Get()
  async list(): Promise<Partial<IParseDocument>[]> {
    return this.service.list();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Partial<IParseDocument>> {
    return this.service.getOne(id);
  }

  @Get(':id/pdf')
  async getPdf(@Param('id') id: string, @Res() res): Promise<void> {
    const result = await this.service.getPdf(id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': result.length,
    });

    res.end(result);
  }

  @Post()
  async create(@BodyParse() body: IParseDocument): Promise<TIdResponse> {
    return this.service.create(body);
  }
}
