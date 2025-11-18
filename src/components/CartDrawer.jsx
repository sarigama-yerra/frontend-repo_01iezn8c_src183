import { useEffect } from "react"

function CartDrawer({ open, items, onClose, onCheckout, onUpdateQty }) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <div className="w-full sm:w-[420px] h-full bg-white shadow-xl p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Your Cart</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">Close</button>
        </div>

        {items.length === 0 ? (
          <p className="text-slate-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-cover" />
                )}
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{item.title}</p>
                  <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))} className="px-2 py-1 rounded bg-slate-100">-</button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.id, item.quantity + 1)} className="px-2 py-1 rounded bg-slate-100">+</button>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-lg font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <button onClick={onCheckout} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartDrawer
