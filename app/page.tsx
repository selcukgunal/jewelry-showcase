import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import ThemeToggle from '@/components/ThemeToggle'
import PageTransition from '@/components/PageTransition'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md"
        style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(var(--bg), 0.85)' }}
      >
        <div
          className="max-w-5xl mx-auto px-4 flex items-center justify-between"
          style={{ height: '56px' }}
        >
          <span className="font-serif text-xl font-semibold" style={{ color: 'var(--text)' }}>
            Koleksiyon
          </span>
          <ThemeToggle />
        </div>
      </header>

      <PageTransition>
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1
              className="font-serif text-3xl font-semibold"
              style={{ color: 'var(--text)' }}
            >
              Tüm Ürünler
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
              {products.length} ürün
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </main>

        <footer className="mt-16 py-8 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Koleksiyon
        </footer>
      </PageTransition>
    </div>
  )
}
