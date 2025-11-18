import { ShoppingCart, Store } from "lucide-react"

function Navbar({ cartCount, onOpenCart }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-semibold text-slate-800">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
            <Store size={18} />
          </span>
          <span className="text-lg">BlueShop</span>
        </a>
        <button
          onClick={onOpenCart}
          className="relative inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-colors"
        >
          <ShoppingCart size={18} />
          <span className="text-sm font-medium">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Navbar
