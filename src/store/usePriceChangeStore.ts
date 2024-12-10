import { create } from 'zustand';
import { PriceChangeRow, ValidationError, Product } from '../types/price-change';

interface PriceChangeState {
  rows: PriceChangeRow[];
  errors: ValidationError[];
  products: Product[];
  addRow: () => void;
  updateRow: (id: string, data: Partial<PriceChangeRow>) => void;
  deleteRow: (id: string) => void;
  setErrors: (errors: ValidationError[]) => void;
  setProducts: (products: Product[]) => void;
}

export const usePriceChangeStore = create<PriceChangeState>((set) => ({
  rows: [{
    id: crypto.randomUUID(),
    sku: '',
    currentPrice: null,
    productCost: null,
    shippingCost: null,
    requestedPrice: 0,
    reason: 'COMPETITIVE_ADJUSTMENT',
    comments: '',
    channels: [],
    priceParity: true,
    isNewListing: false,
    msrp: null,
    channelPrices: {},
  }],
  errors: [],
  products: [],
  addRow: () =>
    set((state) => ({
      rows: [
        ...state.rows,
        {
          id: crypto.randomUUID(),
          sku: '',
          currentPrice: null,
          productCost: null,
          shippingCost: null,
          requestedPrice: 0,
          reason: 'COMPETITIVE_ADJUSTMENT',
          comments: '',
          channels: [],
          priceParity: true,
          isNewListing: false,
          msrp: null,
          channelPrices: {},
        },
      ],
    })),
  updateRow: (id, data) =>
    set((state) => ({
      rows: state.rows.map((row) =>
        row.id === id ? { ...row, ...data } : row
      ),
    })),
  deleteRow: (id) =>
    set((state) => ({
      rows: state.rows.filter((row) => row.id !== id),
    })),
  setErrors: (errors) => set({ errors }),
  setProducts: (products) => set({ products }),
}));