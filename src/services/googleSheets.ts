import { google } from 'googleapis';
import { Product } from '../types/price-change';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const PRODUCTS_SHEET_ID = process.env.VITE_GOOGLE_SHEET_ID;
const PRODUCTS_RANGE = 'Products!A2:C';

export async function getProductsList(): Promise<Product[]> {
  try {
    const auth = await google.auth.getClient({ scopes: SCOPES });
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: PRODUCTS_SHEET_ID,
      range: PRODUCTS_RANGE,
    });

    const rows = response.data.values;
    if (!rows?.length) {
      return [];
    }

    return rows.map((row) => ({
      sku: row[0],
      name: row[1],
      currentPrice: parseFloat(row[2]),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}