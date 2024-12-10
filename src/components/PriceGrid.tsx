import React, { useCallback, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { usePriceChangeStore } from '../store/usePriceChangeStore';
import { ChangeReason, Channel } from '../types/price-change';
import { ChannelSelect } from './ChannelSelect';
import { SkuSelect } from './SkuSelect';
import { PriceCalculations } from './PriceCalculations';
import { ChannelPricing } from './ChannelPricing';
import { getProductsList } from '../services/mockData';

const REASON_OPTIONS: { value: ChangeReason; label: string }[] = [
  { value: 'COMPETITIVE_ADJUSTMENT', label: 'Competitive Adjustment' },
  { value: 'COST_CHANGE', label: 'Cost Change' },
  { value: 'PROMOTIONAL_PRICING', label: 'Promotional Pricing' },
  { value: 'STRATEGIC_REPOSITIONING', label: 'Strategic Repositioning' },
  { value: 'OTHER', label: 'Other' },
];

export function PriceGrid() {
  const { rows, addRow, updateRow, deleteRow, setProducts } = usePriceChangeStore();

  useEffect(() => {
    const loadProducts = async () => {
      const products = await getProductsList();
      setProducts(products);
    };
    loadProducts();
  }, [setProducts]);

  const handleAddRow = useCallback(() => {
    if (rows.length < 100) {
      addRow();
    }
  }, [rows.length, addRow]);

  const handleChannelPriceChange = (rowId: string, channel: Channel, price: number) => {
    updateRow(rowId, {
      channelPrices: {
        ...rows.find(r => r.id === rowId)?.channelPrices,
        [channel.value]: price
      }
    });
  };

  return (
    <div className="w-full space-y-8">
      {rows.map((row) => (
        <div key={row.id} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <SkuSelect
                value={row.sku}
                onChange={(sku, currentPrice, productCost, shippingCost) =>
                  updateRow(row.id, { sku, currentPrice, productCost, shippingCost })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Channels</label>
              <ChannelSelect
                value={row.channels}
                onChange={(channels) => updateRow(row.id, { channels })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Price</label>
              <input
                type="number"
                step="0.01"
                className="form-input rounded-md border-gray-300 w-full"
                value={row.currentPrice || ''}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Requested Price</label>
              <input
                type="number"
                step="0.01"
                required
                className="form-input rounded-md border-gray-300 w-full"
                value={row.requestedPrice}
                onChange={(e) =>
                  updateRow(row.id, {
                    requestedPrice: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <PriceCalculations
            productCost={row.productCost}
            shippingCost={row.shippingCost}
            requestedPrice={row.requestedPrice}
          />

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox rounded text-blue-600"
                  checked={row.priceParity}
                  onChange={(e) =>
                    updateRow(row.id, { priceParity: e.target.checked })
                  }
                />
                <span className="ml-2 text-sm text-gray-700">Price Parity</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox rounded text-blue-600"
                  checked={row.isNewListing}
                  onChange={(e) =>
                    updateRow(row.id, { isNewListing: e.target.checked })
                  }
                />
                <span className="ml-2 text-sm text-gray-700">New Listing</span>
              </label>
            </div>

            {row.isNewListing && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MSRP</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="form-input rounded-md border-gray-300 w-64"
                  value={row.msrp || ''}
                  onChange={(e) =>
                    updateRow(row.id, { msrp: Number(e.target.value) })
                  }
                />
              </div>
            )}

            {!row.priceParity && row.channels.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Channel Prices</h4>
                {row.channels.map((channel) => (
                  <ChannelPricing
                    key={channel.value}
                    channel={channel}
                    price={row.channelPrices[channel.value] || row.requestedPrice}
                    onChange={(price) => handleChannelPriceChange(row.id, channel, price)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <select
                className="form-select rounded-md border-gray-300"
                value={row.reason}
                onChange={(e) =>
                  updateRow(row.id, {
                    reason: e.target.value as ChangeReason,
                  })
                }
              >
                {REASON_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {row.reason === 'OTHER' && (
                <input
                  type="text"
                  className="form-input rounded-md border-gray-300 w-full"
                  value={row.comments}
                  onChange={(e) =>
                    updateRow(row.id, { comments: e.target.value })
                  }
                  maxLength={500}
                  placeholder="Enter reason..."
                />
              )}
            </div>
            <button
              onClick={() => deleteRow(row.id)}
              className="text-red-600 hover:text-red-900"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <button
          onClick={handleAddRow}
          disabled={rows.length >= 100}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          Add Row
        </button>
      </div>
    </div>
  );
}