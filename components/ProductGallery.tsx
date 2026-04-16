'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const prev = () => go((current - 1 + images.length) % images.length)
  const next = () => go((current + 1) % images.length)

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
  }

  return (
    <div>
      {/* Main image */}
      <div
        className="relative aspect-square overflow-hidden rounded-2xl"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            src={images[current]}
            alt={`${productName} — görsel ${current + 1}`}
            className="w-full h-full object-cover cursor-zoom-in select-none"
            onClick={() => setLightbox(true)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40) next()
              else if (info.offset.x > 40) prev()
            }}
          />
        </AnimatePresence>

        {/* Zoom button */}
        <button
          onClick={() => setLightbox(true)}
          className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
          aria-label="Büyüt"
        >
          <ZoomIn size={15} />
        </button>

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-sm text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
              aria-label="Önceki"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-sm text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
              aria-label="Sonraki"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '1rem' : '0.375rem',
                  backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.45)',
                }}
                aria-label={`Görsel ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-200"
              style={{
                outline: i === current ? '2px solid var(--accent)' : '2px solid transparent',
                outlineOffset: '2px',
                opacity: i === current ? 1 : 0.45,
              }}
              aria-label={`Görsel ${i + 1}`}
            >
              <img src={src} alt={`${productName} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full text-white transition-opacity hover:opacity-70"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              onClick={() => setLightbox(false)}
              aria-label="Kapat"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={images[current]}
              alt={productName}
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
