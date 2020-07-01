import { ApiProperty } from '@nestjs/swagger';

export class Product {
  // ID: string (UUID format)
  // Product name: string
  // Price: Floating Number (e.g. 10.99)
  // Quantity: number

  @ApiProperty()
  id: string;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;
}
