import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ReservationsService } from '../services/reservations.service';
import { IsDateString, IsInt } from 'class-validator';
import { logger } from '../utils/logger';

class CreateReservationDto {
  @IsInt() productId: number;
  @IsDateString() date: string;
}

@Controller('reservations')
export class ReservationsController {
  constructor(private reservations: ReservationsService) {}

  /**
   * Creates a new reservation for authenticated user
   * @param req - Request object containing user info from JWT
   * @param body - CreateReservationDto with productId and date
   * @returns Promise<Reservation> - Created reservation object
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: any, @Body() body: CreateReservationDto) {
    try {
      const reservation = await this.reservations.create(req.user.userId, body.productId, body.date);
      logger.info(`Reservation created successfully for user ${req.user.userId}, product ${body.productId}, date ${body.date}`);
      return reservation;
    } catch (error) {
      logger.error(`Failed to create reservation for user ${req.user.userId}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Retrieves all reservations for the authenticated user
   * @param req - Request object containing user info from JWT
   * @returns Promise<Reservation[]> - Array of user's reservations
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async myReservations(@Req() req: any) {
    try {
      const reservations = await this.reservations.listForUser(req.user.userId);
      logger.info(`Retrieved ${reservations.length} reservations for user ${req.user.userId}`);
      return reservations;
    } catch (error) {
      logger.error(`Failed to retrieve reservations for user ${req.user.userId}: ${error.message}`);
      throw error;
    }
  }
}
