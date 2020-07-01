export interface Cart {
  quantities: {
    [productId: string]: number;
  };
}
