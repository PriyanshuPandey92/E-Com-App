import { create, StateCreator } from 'zustand';
import { Product } from './types/product';
import { fetchProducts as fetchProductsService } from './services/product-service';

export interface ProductState {
  products: Product[];
  page: number;
  limit: number;
  search: string;
  sort: string;
  fetchProducts: () => Promise<void>;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setSort: (sort: string) => void;
}

const productStoreCreator: StateCreator<ProductState> = (set, get) => ({
  products: [],
  page: 1,
  limit: 10,
  search: '',
  sort: '',
  fetchProducts: async () => {
    const { page, limit, search, sort } = get();
    try {
      const products = await fetchProductsService(page, limit, search, sort);
      set({ products });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  setPage: (page: number) => set({ page }),
  setSearch: (search: string) => set({ search }),
  setSort: (sort: string) => set({ sort }),
});

export const useProductStore = create<ProductState>(productStoreCreator);