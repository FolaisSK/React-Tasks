import { useDispatch, useSelector } from 'react-redux'
import { closeCart, removeFromCart, updateQuantity } from '../store/cartSlice'

export default function CartDrawer() {
  const dispatch = useDispatch()
  const { items, isOpen } = useSelector((s) => s.cart)
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0)

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
          onClick={() => dispatch(closeCart())}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-integral text-xl font-bold">YOUR CART</h2>
          <button onClick={() => dispatch(closeCart())} className="text-2xl hover:opacity-60">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
              <svg width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-20 h-20 bg-[#F0EEED] rounded-xl flex items-center justify-center p-2 shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain"/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-tight line-clamp-2">{item.title}</p>
                  {item.size && <p className="text-xs text-gray-500 mt-0.5">Size: {item.size}</p>}
                  <p className="font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => dispatch(updateQuantity({ index: idx, quantity: item.quantity - 1 }))}
                        className="px-3 py-1 text-lg hover:bg-gray-100"
                      >−</button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({ index: idx, quantity: item.quantity + 1 }))}
                        className="px-3 py-1 text-lg hover:bg-gray-100"
                      >+</button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(idx))}
                      className="text-red-400 hover:text-red-600 text-lg ml-auto"
                    >🗑</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              Go to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  )
}
