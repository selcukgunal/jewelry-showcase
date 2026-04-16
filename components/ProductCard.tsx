'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/types/product'
import { withBP, formatPrice, categoryLabel } from '@/lib/utils'

export default function ProductCard({
  product,
  index,
}: {
  product: Product
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/urun/${product.id}`} className="block group">
        <div
          className="overflow-hidden rounded-2xl transition-all duration-300"
          style={{ backgroundColor: 'var(--surface)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 32px var(--shadow)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={withBP(product.images[0])}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <span
              className="text-xs uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              {categoryLabel[product.category]}
            </span>
            <h3
              className="font-serif text-base font-semibold mt-0.5 leading-tight"
              style={{ color: 'var(--text)' }}
            >
              {product.name}
            </h3>
            {product.specs.material && (
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {product.specs.material}
              </p>
            )}
            <div className="flex items-center justify-between mt-3">
              <span className="font-semibold text-base" style={{ color: 'var(--accent)' }}>
                {formatPrice(product.price)}
              </span>
              {product.vatIncluded && (
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                  KDV dahil
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
