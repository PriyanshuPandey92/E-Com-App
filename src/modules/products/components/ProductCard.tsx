// modules/products/components/ProductCard.tsx

import { useCartStore } from '@/modules/cart';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }:ProductCardProps) => {

  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    // Convert the product into a CartItem with a default quantity of 1
    // Ensure your CartItem type matches these properties (id, title, price, image, quantity)
    addItem({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div className="border p-4 rounded shadow flex flex-col">
      <div className="w-full h-32 flex items-center justify-center mb-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transform transition duration-500 ease-in-out hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p>{product.description}</p>
      <p className="text-green-600">${product.price.toFixed(2)}</p>
     
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;