import { Product } from '../types/product';
import { fetchProducts, fetchProductsByCategory, fetchCampaignProducts } from './api/productApi';
import { transformProducts } from './transformers/productTransformer';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const data = await fetchProducts();
    console.log('Raw products data:', data);
    return transformProducts(data);
  } catch (error) {
    console.error('Error in getProducts:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const data = await fetchProductsByCategory(category);
    console.log('Raw products data for category:', category, data);
    return transformProducts(data);
  } catch (error) {
    console.error('Error in getProductsByCategory:', error);
    throw error;
  }
};

export const getCampaignProducts = async (): Promise<Product[]> => {
  try {
    const data = await fetchCampaignProducts();
    console.log('Raw campaign products data:', data);
    return transformProducts(data);
  } catch (error) {
    console.error('Error in getCampaignProducts:', error);
    throw error;
  }
};

export type { Product };