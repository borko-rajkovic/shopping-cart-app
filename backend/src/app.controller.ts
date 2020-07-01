import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { AppService } from './app.service';
import { Product } from './models/Product';

@ApiTags('product')
@Controller('product')
@ApiResponse({
  type: Product,
  isArray: true,
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getProducts(): Product[] {
    return this.appService.getProducts();
  }
}
