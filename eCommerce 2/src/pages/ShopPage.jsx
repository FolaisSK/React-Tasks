import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router'
import { fetchProducts, fetchCategories, setSelectedCategory } from '../store/productsSlice'
import ProductCard from '../components/ProductCard'

export default function ShopPage() {
  const dispatch = useDispatch()
  const { items, categories, status, searchQuery, selectedCategory } = useSelector((s) => s.products)
  const [searchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [dispatch, status])

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) dispatch(setSelectedCategory(cat))
  }, [searchParams, dispatch])

  let filtered = [...items]

  // Category filter
  if (selectedCategory !== 'all') {
    filtered = filtered.filter((p) => p.category === selectedCategory)
  }

  // Search filter
  if (searchQuery) {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Price filter
  filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

  // Sort
  if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price)
  if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price)
  if (sortBy === 'rating') filtered.sort((a, b) => b.rating.rate - a.rating.rate)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <a href="/" className="hover:text-black">Home</a>
        <span>›</span>
        <span className="text-black font-medium">Shop</span>
        {selectedCategory !== 'all' && (
          <>
            <span>›</span>
            <span className="text-black font-medium capitalize">{selectedCategory}</span>
          </>
        )}
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filter */}


        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header bar */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="font-integral text-2xl font-black capitalize">
                {selectedCategory === 'all' ? 'All Products' : selectedCategory}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden border border-gray-200 rounded-full px-4 py-2 text-sm"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                Filters
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-full px-4 py-2 text-sm outline-none cursor-pointer"
              >
                <option value="default">Sort by: Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {status === 'loading' ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl aspect-square mb-3"/>
                  <div className="h-4 bg-gray-200 rounded mb-2"/>
                  <div className="h-3 bg-gray-200 rounded w-2/3"/>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
              <span className="text-5xl">🔍</span>
              <p className="font-semibold">No products found</p>
              <p className="text-sm">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
