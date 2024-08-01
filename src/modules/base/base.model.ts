import { Connection, Document, Model, Schema } from 'mongoose';

export abstract class BaseModel<D extends Document> {
  protected model: Model<D>;
  constructor(
    protected connection: Connection,
    protected schema: Schema,
    protected collectionName: string,
  ) {
    this.model = this.connection.model<D, Model<D>>(
      this.collectionName,
      this.schema,
      this.collectionName,
    );
    this.model.schema.index({ _id: 1 });
  }

  async save(body: D): Promise<D> {
    return new this.model(body).save();
  }

  async find(query: object): Promise<D[]> {
    return this.model.find(query);
  }

  async findOne(id: string): Promise<D> {
    return this.model.findById(id);
  }

  async remove(id: string) {
    await this.model.findByIdAndDelete(id);
  }
}
