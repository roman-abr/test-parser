import { ParseModel } from '../parse/parse.model';
import { IParseDocument, Statuses } from '../parse/types';
import { Builder, By, Browser } from 'selenium-webdriver';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkerService {
  private model: ParseModel;
  constructor(model: ParseModel) {
    this.model = model;
  }

  async parse(body: IParseDocument): Promise<void> {
    const doc = await this.model.findOne(body._id);
    doc.status = Statuses.IN_PROCESS;
    await doc.save();
    let success = false;
    for (const _ of Array(5)) {
      try {
        const words = await this.getWords(doc.url);
        doc.words = words;
        doc.status = Statuses.FINISHED;
        await doc.save();
        success = true;
        return;
      } catch (e) {
        console.log(e);
      }
    }
    if (!success) {
      doc.status = Statuses.FAILED;
      await doc.save();
    }
  }

  async getWords(url: string): Promise<string[]> {
    const driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .usingServer(process.env.SELENIUM_SERVER)
      .build();
    await driver.get(url);
    const text = await driver.findElement(By.xpath('//body')).getText();
    const words = Array.from(new Set(text.split(' ')))
      .sort((a, b) => b.length - a.length)
      .slice(0, 10);
    return words;
  }
}
