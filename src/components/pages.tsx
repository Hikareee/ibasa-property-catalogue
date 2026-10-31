import { forwardRef, type ReactNode } from 'react'
import {
  properties,
  statusLabel,
  typeLabel,
  type Lang,
  type Property,
} from '../data/properties'
import { copy } from '../i18n'

export const Sheet = forwardRef<HTMLDivElement, { className?: string; children: ReactNode }>(
  function Sheet({ className = '', children }, ref) {
    return (
      <div ref={ref} className={`sheet ${className}`}>
        {children}
      </div>
    )
  },
)

export const CoverFront = forwardRef<HTMLDivElement, { lang: Lang }>(function CoverFront(
  { lang },
  ref,
) {
  return (
    <Sheet ref={ref} className="cover">
      <div className="cover-inner">
        <img src="/ibasa-logo.png" alt="IBASA" />
        <div>
          <p className="kicker foil">{copy.kicker[lang]}</p>
          <h1 className="foil">IBASA</h1>
          <p className="edition">{copy.titleLeaf[lang]}</p>
        </div>
        <div>
          <p className="edition">{copy.tagline[lang]}</p>
          <p className="foot">{copy.legal} · 2026</p>
        </div>
      </div>
    </Sheet>
  )
})

export const Endpaper = forwardRef<HTMLDivElement, { lang: Lang }>(function Endpaper(
  { lang },
  ref,
) {
  return (
    <Sheet ref={ref}>
      <div className="page-pad flyleaf">
        <p className="small-kicker">{copy.edition[lang]}</p>
        <div className="flyleaf-mark">
          <img src="/ibasa-logo.png" alt="" />
          <p>{copy.legal}</p>
        </div>
        <p className="flyleaf-foot">{copy.tagline[lang]}</p>
      </div>
    </Sheet>
  )
})

export const TitlePage = forwardRef<HTMLDivElement, { lang: Lang }>(function TitlePage(
  { lang },
  ref,
) {
  return (
    <Sheet ref={ref}>
      <div className="page-pad title-page">
        <p className="small-kicker">{copy.kicker[lang]}</p>
        <h1>
          {copy.titleLeaf[lang]}
          <br />
          2026
        </h1>
        <div className="rule" />
        <p>{copy.legal}</p>
        <p>{copy.tagline[lang]}</p>
        <p style={{ marginTop: 'auto', fontSize: 11 }}>{copy.colophon[lang]}</p>
      </div>
    </Sheet>
  )
})

export const Manifesto = forwardRef<HTMLDivElement, { lang: Lang }>(function Manifesto(
  { lang },
  ref,
) {
  return (
    <Sheet ref={ref}>
      <div className="page-pad manifesto">
        <p className="small-kicker">{copy.letterKicker[lang]}</p>
        <h2>{copy.manifestoTitle[lang]}</h2>
        <p>{copy.manifesto[lang]}</p>
        <div className="values">
          {copy.values.map((v) => (
            <span key={v.en}>{v[lang]}</span>
          ))}
        </div>
      </div>
    </Sheet>
  )
})

export const Contents = forwardRef<
  HTMLDivElement,
  { lang: Lang; onJump: (page: number) => void }
>(function Contents({ lang, onJump }, ref) {
  return (
    <Sheet ref={ref}>
      <div className="page-pad">
        <p className="small-kicker">{copy.contents[lang]}</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, margin: '0 0 18px', fontWeight: 500 }}>
          {copy.collection[lang]}
        </h2>
        <div className="toc-list">
          {properties.map((p, i) => (
            <button key={p.id} type="button" onClick={() => onJump(6 + i * 2)}>
              <span className="toc-code">{p.code}</span>
              <span className="toc-name">{p.name[lang]}</span>
              <span className="toc-page">{String(i + 4).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </div>
    </Sheet>
  )
})

function Pin({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="7" fill="#1d4ed8" />
      <circle cx={x} cy={y} r="11" fill="none" stroke="#c5a059" strokeWidth="1.5" />
      <text x={x + 14} y={y + 4} fill="#142033" fontSize="11" fontFamily="Outfit, sans-serif">
        {label}
      </text>
    </g>
  )
}

export const RegionMap = forwardRef<HTMLDivElement, { lang: Lang }>(function RegionMap(
  { lang },
  ref,
) {
  return (
    <Sheet ref={ref}>
      <div className="page-pad map-page">
        <p className="small-kicker">{copy.region[lang]}</p>
        <h2 style={{ fontSize: 32, marginBottom: 8 }}>{copy.regionTitle[lang]}</h2>
        <p>{copy.regionBody[lang]}</p>
        <svg viewBox="0 0 360 240" role="img" aria-label="Cirebon corridor">
          <rect width="360" height="240" fill="#efe7d8" />
          <path d="M20 70 C 80 40, 140 90, 210 60 S 320 40, 340 90" fill="none" stroke="#c5a059" strokeWidth="2" />
          <path d="M40 200 C 120 160, 200 210, 330 150" fill="none" stroke="#1d4ed8" strokeWidth="1.5" opacity="0.5" />
          <Pin x={210} y={118} label="Cirebon" />
          <Pin x={258} y={132} label="Winong" />
          <Pin x={276} y={168} label="Kanci" />
          <Pin x={248} y={96} label="Mundu" />
          <Pin x={168} y={108} label="Plumbon" />
          <Pin x={92} y={88} label="Rebana" />
        </svg>
      </div>
    </Sheet>
  )
})

export const PropertyPhoto = forwardRef<HTMLDivElement, { lang: Lang; property: Property }>(
  function PropertyPhoto({ lang, property }, ref) {
    return (
      <Sheet ref={ref} className="photo-page">
        <img src={property.image} alt={property.name[lang]} />
        <div className="photo-meta">
          <div className="code">{property.code}</div>
          <h3>{property.name[lang]}</h3>
          <span className="badge">
            {property.source === 'ibasa' ? copy.fromIbasa[lang] : copy.sample[lang]}
          </span>
        </div>
      </Sheet>
    )
  },
)

export const PropertyDetails = forwardRef<
  HTMLDivElement,
  { lang: Lang; property: Property; onPreview: (property: Property) => void }
>(function PropertyDetails({ lang, property, onPreview }, ref) {
    return (
      <Sheet ref={ref}>
        <div className="page-pad spread-copy">
          <header>
            <span className="small-kicker">{typeLabel[property.type][lang]}</span>
            <span className="status">{statusLabel[property.status][lang]}</span>
          </header>
          <h2>{property.name[lang]}</h2>
          <p className="loc">{property.location[lang]}</p>
          <p className="price">{property.price[lang]}</p>
          <p className="lede">{property.summary[lang]}</p>
          <p className="small-kicker">{copy.specs[lang]}</p>
          <dl className="specs">
            {property.specs.map((s) => (
              <div key={s.label.en}>
                <dt>{s.label[lang]}</dt>
                <dd>{s.value[lang]}</dd>
              </div>
            ))}
          </dl>
          <p className="small-kicker">{copy.highlights[lang]}</p>
          <ul className="hi">
            {property.highlights[lang].map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <div className="page-actions">
            <button
              type="button"
              className="ghost-btn gold-ghost"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                onPreview(property)
              }}
            >
              {copy.preview3d[lang]}
            </button>
            <a className="ghost-btn" href="mailto:contact@ibasa.co.id">
              {copy.enquire[lang]}
            </a>
          </div>
        </div>
      </Sheet>
    )
  },
)

export const ContactPage = forwardRef<HTMLDivElement, { lang: Lang }>(function ContactPage(
  { lang },
  ref,
) {
  return (
    <Sheet ref={ref}>
      <div className="page-pad contact-page">
        <p className="small-kicker">{copy.enquire[lang]}</p>
        <h2>{copy.contactTitle[lang]}</h2>
        <p>{copy.contactBody[lang]}</p>
        <div className="contact-grid">
          <p>
            <small>{copy.office[lang]}</small>
            {copy.address}
          </p>
          <p>
            <small>Email</small>
            <a href="mailto:contact@ibasa.co.id">{copy.email}</a>
          </p>
          <p>
            <small>Web</small>
            <a href="https://ibasa.co.id" target="_blank" rel="noreferrer">
              {copy.website}
            </a>
          </p>
          <p>
            <small>Legal</small>
            {copy.nib}
          </p>
        </div>
        <a className="ghost-btn" href="mailto:contact@ibasa.co.id">
          {copy.enquire[lang]}
        </a>
      </div>
    </Sheet>
  )
})

export const CoverBack = forwardRef<HTMLDivElement, { lang: Lang }>(function CoverBack(
  { lang },
  ref,
) {
  return (
    <Sheet ref={ref} className="cover">
      <div className="cover-inner">
        <p className="kicker foil">IBASA</p>
        <div>
          <h1 className="foil" style={{ fontSize: 34 }}>
            {copy.tagline[lang]}
          </h1>
          <p className="edition">{copy.legal}</p>
        </div>
        <p className="foot">No. 00 — Prototype · {copy.website}</p>
      </div>
    </Sheet>
  )
})
