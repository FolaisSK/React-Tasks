import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '../store/productsSlice'
import { toggleCart } from '../store/cartSlice'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector((s) => s.cart.items)
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0)
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [announcementVisible, setAnnouncementVisible] = useState(true)

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(setSearchQuery(search))
    navigate('/shop')
  }

  return (
    <>
      {/* Announcement Bar */}
      {announcementVisible && (
        <div className="bg-black text-white text-center text-xs py-2 px-4 relative">
          Sign up and get 20% off to your first order.{' '}
          <Link to="/shop" className="underline font-semibold">Sign Up Now</Link>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:opacity-70"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Hamburger (mobile) */}
            <button
              className="lg:hidden text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>

            {/* Logo */}
            <Link to="/" className="font-integral text-2xl font-black tracking-tight shrink-0">
              SHOP.CO
            </Link>

            {/* Nav Links */}
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
              <div className="relative group">
                <button className="flex items-center gap-1 hover:opacity-70">
                  Shop <span className="text-xs">▾</span>
                </button>
                <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg py-2 hidden group-hover:block z-50">
                  <Link to="/shop" className="block px-4 py-2 text-sm hover:bg-gray-50">All Products</Link>
                  <Link to="/shop?cat=men's clothing" className="block px-4 py-2 text-sm hover:bg-gray-50">Men's Clothing</Link>
                  <Link to="/shop?cat=women's clothing" className="block px-4 py-2 text-sm hover:bg-gray-50">Women's Clothing</Link>
                  <Link to="/shop?cat=electronics" className="block px-4 py-2 text-sm hover:bg-gray-50">Electronics</Link>
                  <Link to="/shop?cat=jewelery" className="block px-4 py-2 text-sm hover:bg-gray-50">Jewelery</Link>
                </div>
              </div>
              <Link to="/shop?sale=true" className="hover:opacity-70">On Sale</Link>
              <Link to="/shop" className="hover:opacity-70">New Arrivals</Link>
              <Link to="/shop" className="hover:opacity-70">Brands</Link>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-sm">
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-gray-100 rounded-full pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>
            </form>

            {/* Icons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => dispatch(toggleCart())}
                className="relative p-1 hover:opacity-70"
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="p-1 hover:opacity-70">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-4 space-y-3 text-sm font-medium">
              <Link to="/shop" className="block py-1 hover:opacity-70" onClick={() => setMenuOpen(false)}>Shop</Link>
              <Link to="/shop" className="block py-1 hover:opacity-70" onClick={() => setMenuOpen(false)}>On Sale</Link>
              <Link to="/shop" className="block py-1 hover:opacity-70" onClick={() => setMenuOpen(false)}>New Arrivals</Link>
              <Link to="/shop" className="block py-1 hover:opacity-70" onClick={() => setMenuOpen(false)}>Brands</Link>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
                />
              </form>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
