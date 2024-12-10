import { Product } from '../types/price-change';

const MOCK_PRODUCTS: Product[] = [
  { 
    sku: 'SKU001', 
    name: 'Product 1', 
    currentPrice: 29.99,
    productCost: 15.00,
    shippingCost: 4.99
  },
  { 
    sku: 'SKU002', 
    name: 'Product 2', 
    currentPrice: 49.99,
    productCost: 25.00,
    shippingCost: 5.99
  },
  { 
    sku: 'SKU003', 
    name: 'Product 3', 
    currentPrice: 99.99,
    productCost: 50.00,
    shippingCost: 7.99
  },
  { 
    sku: 'SKU004', 
    name: 'Product 4', 
    currentPrice: 149.99,
    productCost: 75.00,
    shippingCost: 9.99
  },
  { 
    sku: 'SKU005', 
    name: 'Product 5', 
    currentPrice: 199.99,
    productCost: 100.00,
    shippingCost: 12.99
  },
];

export async function getProductsList(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_PRODUCTS;
}