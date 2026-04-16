import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { products, getProductById } from '@/data/products'
import { withBP, formatPrice, categoryLabel } from '@/lib/utils'
import ProductGallery from '@/components/ProductGallery'
import SpecList from '@/components/SpecList'
import ThemeToggle from '@/components/ThemeToggle'
import PageTransition from '@/components/PageTransition'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)
  if (!product) return { title: 'Ürün Bulunamadı' }
  return {
    title: product.name,
    description:
      product.description ??
      `${product.name} — ${product.specs.material ?? ''} — ${formatPrice(product.price)}`,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) notFound()

  const images = product.images.map((img) => withBP(img))

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md"
        style={{ borderColor: 'var(--border)' }}
      >
        <div
          className="max-w-2xl mx-auto px-4 flex items-center justify-between"
          style={{ height: '56px' }}
        >
          <Link
            href="/"
            className="flex items-center gap-1 text-sm transition-colors hover:opacity-80"
            style={{ color: 'var(--text-muted)' }}
          >
            <ChevronLeft size={16} />
            Koleksiyon
          </Link>
          <span
            className="text-xs font-mono"
            style={{ color: 'var(--text-muted)' }}
          >
            #{product.id}
          </span>
          <ThemeToggle />
        </div>
      </header>

      <PageTransition>
        <main className="max-w-2xl mx-auto px-4 py-6 pb-20">
          {/* Gallery */}
          <ProductGallery images={images} productName={product.name} />

          {/* Name */}
          <div className="mt-6 space-y-0.5">
            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              {categoryLabel[product.category]}
            </p>
            <h1
              className="font-serif text-3xl font-semibold leading-tight"
              style={{ color: 'var(--text)' }}
            >
              {product.name}
            </h1>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>
              {formatPrice(product.price)}
            </span>
            {product.vatIncluded && (
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                KDV dahil
              </span>
            )}
          </div>

          {/* Specs */}
          {Object.keys(product.specs).length > 0 && (
            <section className="mt-8">
              <h2
                className="mb-3 text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--text-muted)' }}
              >
                Özellikler
              </h2>
              <SpecList specs={product.specs} />
            </section>
          )}

          {/* Description */}
          {product.description && (
            <section className="mt-8">
              <h2
                className="mb-3 text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--text-muted)' }}
              >
                Açıklama
              </h2>
              <p className="leading-relaxed text-sm" style={{ color: 'var(--text)' }}>
                {product.description}
              </p>
            </section>
          )}

          {/* Footer note */}
          <div
            className="mt-10 rounded-xl border px-4 py-3 text-center text-xs"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            Gösterilen fiyata KDV dahildir · Ürün kodu: {product.id}
          </div>
        </main>
      </PageTransition>
    </div>
  )
}
