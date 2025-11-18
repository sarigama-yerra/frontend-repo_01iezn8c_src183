import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${baseUrl}/api/products`)
        const data = await res.json()
        setProducts(data.items || [])
      } catch (e) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [baseUrl])

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) {
        return prev.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((p) => p.id === id ? { ...p, quantity: qty } : p))
  }

  const checkout = async () => {
    try {
      const payload = {
        customer_name: 'Guest Customer',
        customer_email: 'guest@example.com',
        customer_address: '123 Demo Street',
        items: cart.map((c) => ({
          product_id: c.id,
          title: c.title,
          price: c.price,
          quantity: c.quantity,
        })),
      }
      const res = await fetch(`${baseUrl}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (res.ok) {
        alert(`Order created! ID: ${data.order_id}`)
        setCart([])
        setCartOpen(false)
      } else {
        alert(`Checkout failed: ${data.detail || 'Unknown error'}`)
      }
    } catch (e) {
      alert('Checkout error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar cartCount={cart.reduce((s,i)=>s+i.quantity,0)} onOpenCart={()=>setCartOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <section className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Discover products</h1>
          <p className="text-slate-600 mt-2">Browse a curated list of demo products. Add to cart and try checkout.</p>
        </section>

        {loading ? (
          <p className="text-slate-500">Loading products...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : products.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg">
            <p>No products found. You can seed products using the backend, or add some via the database viewer.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </main>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onCheckout={checkout}
        onUpdateQty={updateQty}
      />
    </div>
  )
}

export default App
