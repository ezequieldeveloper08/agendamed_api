import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ProfessionalsModule } from './modules/professionals/professionals.module';
import { ProfessionalCategoriesModule } from './modules/professional-categories/professional-categories.module';
import { LocationsModule } from './modules/locations/locations.module';
import { LocationCategoriesModule } from './modules/location-categories/location-categories.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT!,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ProfessionalsModule,
    ProfessionalCategoriesModule,
    LocationsModule,
    LocationCategoriesModule,
    AppointmentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
