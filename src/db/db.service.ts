import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DbService {
  constructor(private readonly sequelize: Sequelize) {}
  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('Db connected.:D');
    } catch (error) {
      console.error('Db Not Connected.:(', error);
    }
  }
}
