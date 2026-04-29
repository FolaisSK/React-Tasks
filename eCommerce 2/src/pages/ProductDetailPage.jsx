import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById, clearSelectedProduct, fetchProducts } from '../store/productsSlice'
import { addToCart } from '../store/cartSlice'
import ProductCard from '../components/ProductCard'

const SIZES = ['Small', 'Medium', 'Large', 'X-Large']
const COLORS = ['#4A5240', '#31574E', '#314557']

const StarRating = ({ rating, count }) => (
  <div className="flex items-center gap-2">
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#FFC633' : '#e5e7eb'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
    <span className="text-sm text-gray-600">{rating.toFixed(1)}/5</span>
    {count && <span className="text-sm text-gray-400">({count} reviews)</span>}
  </div>
)

export default function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedProduct, selectedStatus, items } = useSelector((s) => s.products)

  const [selectedSize, setSelectedSize] = useState('Large')
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const [quantity, setQuantity] = useState(1)
  const [activeImg, setActiveImg] = useState(null)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    dispatch(fetchProductById(id))
    if (items.length === 0) dispatch(fetchProducts())
    return () => dispatch(clearSelectedProduct())
  }, [id, dispatch])

  useEffect(() => {
    if (selectedProduct) setActiveImg(selectedProduct.image)
  }, [selectedProduct])

  if (selectedStatus === 'loading' || !selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-10 animate-pulse">
        <div className="flex gap-10">
          <div className="w-1/2 aspect-square bg-gray-200 rounded-3xl"/>
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"/>
            <div className="h-6 bg-gray-200 rounded w-1/2"/>
            <div className="h-4 bg-gray-200 rounded"/>
            <div className="h-4 bg-gray-200 rounded w-5/6"/>
          </div>
        </div>
      </div>
    )
  }

  const isOnSale = selectedProduct.price > 50
  const discountedPrice = (selectedProduct.price * 0.7).toFixed(2)

  // Thumbnail images (API doesn't provide multiple; we simulate)
  const thumbnails = [selectedProduct.image, selectedProduct.image, selectedProduct.image]

  const handleAddToCart = () => {
    dispatch(addToCart({
      product: selectedProduct,
      quantity,
      size: selectedSize,
      color: selectedColor,
    }))
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const relatedProducts = items
    .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
        <Link to="/" className="hover:text-black">Home</Link>
        <span>›</span>
        <Link to="/shop" className="hover:text-black">Shop</Link>
        <span>›</span>
        <span className="text-black capitalize">{selectedProduct.category}</span>
        <span>›</span>
        <span className="text-black line-clamp-1 max-w-[200px]">{selectedProduct.title}</span>
      </div>

      {/* Product Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-16">
        {/* Images */}
        <div className="flex flex-col sm:flex-row lg:flex-row gap-4 lg:w-[48%]">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 order-2 sm:order-1">
            {thumbnails.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(img)}
                className={`w-20 h-20 sm:w-24 sm:h-24 bg-[#F0EEED] rounded-xl flex items-center justify-center p-2 border-2 transition-colors ${activeImg === img && i === thumbnails.indexOf(activeImg) ? 'border-black' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-contain"/>
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-[#F0EEED] rounded-3xl flex items-center justify-center p-8 order-1 sm:order-2 aspect-square">
            <img
              src={activeImg || selectedProduct.image}
              alt={selectedProduct.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Details */}
        <div className="lg:w-1/2">
          <h1 className="font-integral text-2xl sm:text-3xl font-black leading-tight mb-3">
            {selectedProduct.title.toUpperCase()}
          </h1>

          <StarRating rating={selectedProduct.rating.rate} count={selectedProduct.rating.count} />

          <div className="flex items-center gap-3 mt-4 mb-4">
            {isOnSale ? (
              <>
                <span className="font-black text-3xl">${discountedPrice}</span>
                <span className="text-gray-400 line-through text-xl">${selectedProduct.price.toFixed(2)}</span>
                <span className="bg-red-100 text-red-500 text-sm font-semibold px-3 py-1 rounded-full">-30%</span>
              </>
            ) : (
              <span className="font-black text-3xl">${selectedProduct.price.toFixed(2)}</span>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6 border-b border-gray-100 pb-6">
            {selectedProduct.description}
          </p>

          {/* Colors */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-gray-500 mb-3">Select Colors</p>
            <div className="flex gap-3">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${selectedColor === color ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100 mb-5"/>

          {/* Sizes */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-500 mb-3">Choose Size</p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-gray-100 text-gray-600 border-transparent hover:border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100 mb-6"/>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-5 py-3 text-xl hover:bg-gray-200 transition-colors"
              >−</button>
              <span className="px-4 font-semibold text-base min-w-[2rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-5 py-3 text-xl hover:bg-gray-200 transition-colors"
              >+</button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 rounded-full font-semibold text-sm transition-all ${
                addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex gap-4 mt-6 flex-wrap">
            {[
              { icon: '🚚', text: 'Free shipping over $100' },
              { icon: '↩', text: '30-day returns' },
              { icon: '🛡', text: 'Secure checkout' },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="font-integral text-2xl font-black text-center mb-8">YOU MIGHT ALSO LIKE</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
