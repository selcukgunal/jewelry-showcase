import Link from 'next/link'
import PageTransition from '@/components/PageTransition'

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <PageTransition>
        <div className="px-4 text-center">
          <p
            className="font-serif text-8xl font-semibold"
            style={{ color: 'var(--accent)' }}
          >
            404
          </p>
          <h2
            className="font-serif mt-4 text-2xl font-semibold"
            style={{ color: 'var(--text)' }}
          >
            Ürün bulunamadı
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            Aradığınız ürün mevcut değil veya kaldırılmış.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Koleksiyona Dön
          </Link>
        </div>
      </PageTransition>
    </div>
  )
}
