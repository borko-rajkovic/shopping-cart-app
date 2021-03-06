import { Injectable } from '@nestjs/common';
import { Product } from './models/Product';

const initialProducts: Product[] = [
  {
    id: '64b25947-7777-434f-8048-31c2a27985af',
    productName: 'Alesis Turbo Mash Kit E-drum set',
    price: 299.0,
    quantity: 150,
  },
  {
    id: '73ed5212-a19d-487c-b75f-72affd75079e',
    productName: 'Numark PT01 Scratch',
    price: 104.4,
    quantity: 200,
  },
  {
    id: 'db692d67-1151-4a09-9b55-692b7820cbc3',
    productName: 'J & D Acoustic Bass',
    price: 159.0,
    quantity: 50,
  },
  {
    id: 'd1022560-6c3d-44f5-a1c9-91210a6c366e',
    productName: 'Gibson 1959 VOS Vintage Burst',
    price: 5290.0,
    quantity: 4,
  },
  {
    id: 'f5114ff1-4c43-4529-8923-40a57d8ef18b',
    productName: 'Epiphone Les Paul',
    price: 179.0,
    quantity: 150,
  },
];

@Injectable()
export class AppService {
  getProducts(): Product[] {
    return initialProducts;
  }
}
