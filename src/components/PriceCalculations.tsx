import React from 'react';

interface PriceCalculationsProps {
  productCost: number | null;
  shippingCost: number | null;
  requestedPrice: number;
}

export function PriceCalculations({ productCost, shippingCost, requestedPrice }: PriceCalculationsProps) {
  const totalCost = (productCost || 0) + (shippingCost || 0);
  const profit = requestedPrice - totalCost;
  const margin = totalCost > 0 ? (profit / requestedPrice) * 100 : 0;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Cost</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
          value={productCost || ''}
          disabled
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Shipping Cost</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
          value={shippingCost || ''}
          disabled
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Profit</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
          value={profit.toFixed(2)}
          disabled
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Margin (%)</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
          value={margin.toFixed(2)}
          disabled
        />
      </div>
    </div>
  );
}