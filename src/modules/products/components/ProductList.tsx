import  { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products } :any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let updatedProducts = [...products];

    // Filtering products based on search query
    if (searchQuery) {
      updatedProducts = updatedProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting products based on price
    if (sortOption === 'lowToHigh') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'highToLow') {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [searchQuery, sortOption, products]);

  // Voice search handling
  const handleVoiceSearch = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onstart = () => console.log('Voice recognition started');
    recognition.onresult = (event:any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };
    recognition.start();
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button onClick={handleVoiceSearch} className="bg-blue-500 text-white p-2 rounded">
          🎤 Voice Search
        </button>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="default">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product:any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
