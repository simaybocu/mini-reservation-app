import { Controller, Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { logger } from '../utils/logger';

@Controller('products')
export class ProductsController {
  constructor(private products: ProductsService) {}

  /**
   * Retrieves all available products from the database
   * @returns Promise<Product[]> - Array of all products
   */
  @Get()
  async list() {
    try {
      const products = await this.products.findAll();
      logger.info(`Retrieved ${products.length} products`);
      return products;
    } catch (error) {
      logger.error(`Failed to retrieve products: ${error.message}`);
      throw error;
    }
  }

  /**
   * Retrieves a specific product by its ID
   * @param id - The product ID to search for
   * @returns Promise<Product> - The product if found
   * @throws NotFoundException - If product doesn't exist
   */
  @Get(':id')
  async detail(@Param('id') id: string) {
    try {
      const p = await this.products.findOne(id);
      if (!p) {
        logger.error(`Product not found: ${id}`);
        throw new NotFoundException('Product not found');
      }
      logger.info(`Retrieved product: ${id}`);
      return p;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      logger.error(`Failed to retrieve product ${id}: ${error.message}`);
      throw error;
    }
  }
}
