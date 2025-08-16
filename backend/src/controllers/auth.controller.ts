import { Body, Controller, Post } from '@nestjs/common';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { AuthService } from '../services/auth.service';
import { logger } from '../utils/logger';

class AuthDto {
  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  /**
   * Registers a new user with email and password
   * @param body - AuthDto containing email and password
   * @returns Promise<{ access_token: string }> - JWT token for authentication
   */
  @Post('register')
  async register(@Body() body: AuthDto) {
    try {
      const result = await this.auth.register(body.email, body.password);
      logger.info(`User registered successfully: ${body.email}`);
      return result;
    } catch (error) {
      logger.error(`Registration failed for ${body.email}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Authenticates user and returns JWT token
   * @param body - AuthDto containing email and password credentials
   * @returns Promise<{ access_token: string }> - JWT token for authentication
   */
  @Post('login')
  async login(@Body() body: AuthDto) {
    try {
      const result = await this.auth.login(body.email, body.password);
      logger.info(`User logged in successfully: ${body.email}`);
      return result;
    } catch (error) {
      logger.error(`Login failed for ${body.email}: ${error.message}`);
      throw error;
    }
  }
}
