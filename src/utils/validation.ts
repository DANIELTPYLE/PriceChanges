import { PriceChangeRow, ValidationError } from '../types/price-change';
import { addDays } from 'date-fns';

export function validatePriceChanges(rows: PriceChangeRow[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const today = new Date();
  const maxDate = addDays(today, 90);

  rows.forEach((row) => {
    if (!row.sku) {
      errors.push({
        rowId: row.id,
        field: 'sku',
        message: 'SKU is required',
      });
    }

    if (row.channels.length === 0) {
      errors.push({
        rowId: row.id,
        field: 'channels',
        message: 'At least one channel must be selected',
      });
    }

    if (row.requestedPrice <= 0) {
      errors.push({
        rowId: row.id,
        field: 'requestedPrice',
        message: 'Requested price must be greater than 0',
      });
    }

    if (row.effectiveDate < addDays(today, 1)) {
      errors.push({
        rowId: row.id,
        field: 'effectiveDate',
        message: 'Effective date must be at least tomorrow',
      });
    }

    if (row.effectiveDate > maxDate) {
      errors.push({
        rowId: row.id,
        field: 'effectiveDate',
        message: 'Effective date cannot be more than 90 days in the future',
      });
    }

    if (row.reason === 'OTHER' && !row.comments) {
      errors.push({
        rowId: row.id,
        field: 'comments',
        message: 'Comments are required when reason is Other',
      });
    }

    if (
      row.currentPrice &&
      row.requestedPrice &&
      Math.abs((row.requestedPrice - row.currentPrice) / row.currentPrice) > 0.2
    ) {
      errors.push({
        rowId: row.id,
        field: 'requestedPrice',
        message: 'Price change exceeds 20%',
      });
    }
  });

  return errors;
}