import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Newsletter */}
      <div className="bg-black mx-4 sm:mx-8 lg:mx-16 rounded-3xl px-8 py-10 -mb-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <h3 className="font-integral text-white text-2xl sm:text-3xl font-black max-w-xs leading-tight">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">✉</span>
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-white rounded-full pl-10 pr-4 py-3 text-sm w-full sm:w-72 outline-none"
            />
          </div>
          <button className="bg-white text-black font-semibold px-6 py-3 rounded-full text-sm hover:bg-gray-100 transition-colors whitespace-nowrap">
            Subscribe to Newsletter
          </button>
        </div>
      </div>

      {/* Links */}
      <div className="bg-gray-50 pt-16 pb-8 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-integral text-xl font-black mb-3">SHOP.CO</h4>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'f', 'in', '𝗈'].map((icon, i) => (
                <a key={i} href="#" className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-sm hover:bg-black hover:text-white hover:border-black transition-colors">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'COMPANY', links: ['About', 'Features', 'Works', 'Career'] },
            { title: 'HELP', links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'] },
            { title: 'FAQ', links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'] },
            { title: 'RESOURCES', links: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'] },
          ].map((col) => (
            <div key={col.title}>
              <h5 className="font-bold text-xs tracking-widest mb-4">{col.title}</h5>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-200 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="flex gap-2">
            {['VISA', 'MC', 'AMEX', 'PayPal'].map((p) => (
              <span key={p} className="bg-white border border-gray-200 rounded px-2 py-1 text-xs font-semibold text-gray-600">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
