import React from 'react';
import { Channel } from '../types/price-change';

interface ChannelPricingProps {
  channel: Channel;
  price: number;
  onChange: (price: number) => void;
}

export function ChannelPricing({ channel, price, onChange }: ChannelPricingProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 w-24">{channel.label}</span>
      <input
        type="number"
        step="0.01"
        min="0"
        className="form-input rounded-md border-gray-300"
        value={price}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}