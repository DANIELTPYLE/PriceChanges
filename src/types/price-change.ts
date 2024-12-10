export interface PriceChangeRow {
  id: string;
  sku: string;
  currentPrice: number | null;
  productCost: number | null;
  shippingCost: number | null;
  requestedPrice: number;
  reason: ChangeReason;
  comments: string;
  channels: Channel[];
  priceParity: boolean;
  isNewListing: boolean;
  msrp: number | null;
  channelPrices: Record<string, number>;
}

export type ChangeReason =
  | 'COMPETITIVE_ADJUSTMENT'
  | 'COST_CHANGE'
  | 'PROMOTIONAL_PRICING'
  | 'STRATEGIC_REPOSITIONING'
  | 'OTHER';

export interface Channel {
  value: string;
  label: string;
}

export interface ValidationError {
  rowId: string;
  field: keyof PriceChangeRow;
  message: string;
}

export interface Product {
  sku: string;
  name: string;
  currentPrice: number;
  productCost?: number;
  shippingCost?: number;
}