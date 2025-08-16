import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './orm/typeorm.config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ReservationsController } from './controllers/reservations.controller';
import { ReservationsService } from './services/reservations.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from './models/user.entity';
import { Product } from './models/product.entity';
import { Reservation } from './models/reservation.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig([User, Product, Reservation])),
    TypeOrmModule.forFeature([User, Product, Reservation]),
    JwtModule.register({})
  ],
  controllers: [AuthController, ProductsController, ReservationsController],
  providers: [AuthService, UsersService, ProductsService, ReservationsService, JwtStrategy, JwtAuthGuard]
})
export class AppModule {}
