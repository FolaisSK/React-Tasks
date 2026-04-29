import { useEffect } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/productsSlice'
import ProductCard from '../components/ProductCard'

const brands = ['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein']

const styleCategories = [
  { name: 'Casual', bg: 'bg-gray-100', img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80' },
  { name: 'Formal', bg: 'bg-gray-200', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Party', bg: 'bg-rose-50', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80' },
  { name: 'Gym', bg: 'bg-blue-50', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80' },
]

const testimonials = [
  { name: 'Sarah M.', text: "I'm blown away by the quality and style of the clothes I received. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.", rating: 5 },
  { name: 'Alex K.', text: "Finding clothes that align with my personal style used to be a challenge. The range of options they offer is truly remarkable, catering to a variety of tastes.", rating: 5 },
  { name: 'James L.', text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection is not only diverse but also on-point.", rating: 4 },
]

export default function HomePage() {
  const dispatch = useDispatch()
  const { items, status } = useSelector((s) => s.products)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [dispatch, status])

  const newArrivals = items.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#F2F0F1] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12 lg:py-0 flex flex-col lg:flex-row items-center justify-between gap-8 min-h-[500px]">
          <div className="lg:max-w-lg">
            <h1 className="font-integral text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 max-w-sm">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors"
            >
              Shop Now
            </Link>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[
                { value: '200+', label: 'International Brands' },
                { value: '2,000+', label: 'High-Quality Products' },
                { value: '30,000+', label: 'Happy Customers' },
              ].map((stat) => (
                <div key={stat.label} className="border-l border-gray-300 pl-4 first:border-l-0 first:pl-0">
                  <p className="font-black text-xl sm:text-2xl">{stat.value}</p>
                  <p className="text-gray-500 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image placeholder with decorative stars */}
          <div className="relative hidden lg:flex items-end justify-center flex-1 h-[500px]">
            <div className="absolute top-8 right-8 text-4xl">✦</div>
            <div className="absolute bottom-16 left-4 text-2xl">✦</div>
            <img
              src="/../src/components/b26fea69ccfd8aa5825862cdb9604a4fb4930464.jpg"
              alt="Fashion hero"
              className="h-full w-full object-cover object-top rounded-b-[120px]"
            />
          </div>
        </div>
      </section>

      {/* Brand Strip */}
      <section className="bg-black py-5 overflow-hidden">
        <div className="flex items-center justify-around gap-8 px-8 flex-wrap">
          {brands.map((b) => (
            <span key={b} className="text-white font-bold text-lg sm:text-xl tracking-widest opacity-90">{b}</span>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16">
        <h2 className="font-integral text-3xl font-black text-center mb-10">NEW ARRIVALS</h2>
        {status === 'loading' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl aspect-square mb-3"/>
                <div className="h-4 bg-gray-200 rounded mb-2"/>
                <div className="h-3 bg-gray-200 rounded w-2/3"/>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className="flex justify-center mt-10">
          <Link
            to="/shop"
            className="border border-gray-300 px-10 py-3 rounded-full text-sm font-semibold hover:bg-black hover:text-white hover:border-black transition-all"
          >
            View All
          </Link>
        </div>
      </section>

      <hr className="max-w-7xl mx-auto border-gray-200 px-16"/>

      {/* Browse by Dress Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16">
        <div className="bg-[#F0EEED] rounded-3xl p-8 sm:p-12">
          <h2 className="font-integral text-2xl sm:text-3xl font-black text-center mb-8">BROWSE BY DRESS STYLE</h2>
          <div className="grid grid-cols-2 gap-4">
            {styleCategories.map((cat) => (
              <Link
                key={cat.name}
                to="/shop"
                className={`${cat.bg} rounded-2xl overflow-hidden relative h-40 sm:h-52 group`}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
                <span className="absolute top-4 left-4 font-bold text-sm sm:text-base text-black bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-integral text-2xl sm:text-3xl font-black">OUR HAPPY CUSTOMERS</h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">←</button>
            <button className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">→</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="border border-gray-100 rounded-2xl p-6">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < t.rating ? '#FFC633' : '#e5e7eb'}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-sm">{t.name}</span>
                <span className="text-green-500 text-xs">✓</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
