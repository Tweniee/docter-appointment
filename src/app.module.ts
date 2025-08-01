import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbService } from './db/db.service';

@Module({
  imports: [
    DoctorModule,
    AppointmentModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: String(config.get('DB_PASSWORD')),
        database: config.get('DB_DATABASE'),
        autoLoadModels: true,
        logging: false,
        synchronize: true, // For development only; disable in production
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
