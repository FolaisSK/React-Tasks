import { Link } from 'react-router'

const StarRating = ({ rating }) => {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= full ? '#FFC633' : i === full + 1 && half ? 'url(#half)' : '#e5e7eb'}>
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#FFC633"/>
              <stop offset="50%" stopColor="#e5e7eb"/>
            </linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}/5</span>
    </div>
  )
}

export default function ProductCard({ product }) {
  const discountedPrice = (product.price * 0.7).toFixed(2)
  const isOnSale = product.price > 50

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-[#F0EEED] rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-6 mb-3 relative">
        {isOnSale && (
          <span className="absolute top-3 right-3 bg-red-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            -30%
          </span>
        )}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div>
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">{product.title}</h3>
        <StarRating rating={product.rating.rate} />
        <div className="flex items-center gap-2 mt-1">
          {isOnSale ? (
            <>
              <span className="font-bold text-base">${discountedPrice}</span>
              <span className="text-gray-400 line-through text-sm">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-bold text-base">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
