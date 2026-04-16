import { Gem, Weight, Ruler, MapPin, Layers, Scissors } from 'lucide-react'
import type { Product } from '@/types/product'

const specConfig: Record<string, { label: string; Icon: React.ElementType }> = {
  material: { label: 'Malzeme', Icon: Layers },
  weight: { label: 'Ağırlık', Icon: Weight },
  stone: { label: 'Taş', Icon: Gem },
  stoneCut: { label: 'Kesim', Icon: Scissors },
  origin: { label: 'Menşe', Icon: MapPin },
}

interface SpecListProps {
  specs: Product['specs']
}

export default function SpecList({ specs }: SpecListProps) {
  const entries = Object.entries(specs).filter(([key, val]) => val && key !== 'sizes')

  return (
    <div className="space-y-2">
      {entries.map(([key, value]) => {
        const config = specConfig[key]
        if (!config) return null
        const { Icon } = config
        return (
          <div
            key={key}
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ backgroundColor: 'var(--surface)' }}
          >
            <Icon size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <span
              className="text-sm w-20 shrink-0"
              style={{ color: 'var(--text-muted)' }}
            >
              {config.label}
            </span>
            <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              {value as string}
            </span>
          </div>
        )
      })}

      {specs.sizes && specs.sizes.length > 0 && (
        <div
          className="px-4 py-3 rounded-xl"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Ruler size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <span className="text-sm w-20 shrink-0" style={{ color: 'var(--text-muted)' }}>
              Bedenler
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pl-[calc(14px+0.75rem)]">
            {specs.sizes.map((size) => (
              <span
                key={size}
                className="px-3 py-1 text-sm rounded-full border"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
