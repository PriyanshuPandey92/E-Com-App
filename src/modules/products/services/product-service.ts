

import apiClient from '@/shared/services/api-client';
import { Product } from '../types/product';

const API_BASE_URL = import.meta.env.VITE_PRODUCTS_URL;

export const fetchProducts = async (
  page: number,
  limit: number,
  search: string = '',
  sort: string = ''
): Promise<Product[]> => {
  const params: Record<string, any> = { page, limit };
  if (search) {
    params.search = search;
  }
  if (sort) {
    params.sort = sort;
  }
  const response = await apiClient.get(API_BASE_URL, { params });
  return response.data;
};