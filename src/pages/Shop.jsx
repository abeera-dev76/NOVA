import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Search, SlidersHorizontal } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';

const categoriesList = [
  { id: 'all', label: 'All Collections' },
  { id: 'sneakers', label: 'Sneakers' },
  { id: 'headphones', label: 'Headphones' },
  { id: 'watches', label: 'Watches' },
  { id: 'handbags', label: 'Handbags' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'sunglasses', label: 'Sunglasses' },
  { id: 'speakers', label: 'Speakers' },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'featured';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [sortBy, setSortBy] = useState(sortParam);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          !searchTerm ||
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-nova-purple uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NOVA Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Curated Collections
          </h1>
          <p className="text-sm text-nova-muted mt-1">
            Displaying {filteredProducts.length} items with prices in Pakistani Rupees (PKR)
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search catalog..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0e0e16] border border-white/10 text-white text-xs focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Filter Tabs & Sort Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSearchParams(cat.id === 'all' ? {} : { category: cat.id });
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory.toLowerCase() === cat.id.toLowerCase()
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-purple'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-xl bg-[#0e0e16] border border-white/10 text-xs text-white focus:outline-none self-start sm:self-auto"
        >
          <option value="featured">Featured First</option>
          <option value="newest">Newest Drops First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Customer Rated</option>
        </select>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-8 bg-[#0c0c14] rounded-2xl border border-white/10">
          <p className="text-lg font-bold text-white mb-2">No items found</p>
          <p className="text-xs text-nova-muted mb-4">Try clearing search filters or changing categories.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
            }}
            className="px-6 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
