import React from 'react';
import Select from 'react-select';
import { usePriceChangeStore } from '../store/usePriceChangeStore';

interface SkuSelectProps {
  value: string;
  onChange: (sku: string, currentPrice: number | null, productCost: number | null, shippingCost: number | null) => void;
}

export function SkuSelect({ value, onChange }: SkuSelectProps) {
  const products = usePriceChangeStore((state) => state.products);

  const options = products.map((product) => ({
    value: product.sku,
    label: `${product.sku} - ${product.name}`,
    currentPrice: product.currentPrice,
    productCost: product.productCost,
    shippingCost: product.shippingCost,
  }));

  const selectedOption = options.find((option) => option.value === value);

  return (
    <Select
      value={selectedOption}
      onChange={(newValue) => {
        const option = newValue as typeof options[0] | null;
        onChange(
          option?.value || '',
          option?.currentPrice || null,
          option?.productCost || null,
          option?.shippingCost || null
        );
      }}
      options={options}
      className="w-full"
      classNamePrefix="select"
      placeholder="Select SKU..."
    />
  );
}