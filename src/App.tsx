import { useEffect, useMemo, useState } from 'react'
import { FlipCatalogue } from './components/FlipCatalogue'
import { Preview3D } from './components/Preview3D'
import { Scene } from './components/Scene'
import { properties, type Lang, type Property } from './data/properties'
import { copy } from './i18n'

function propertyForPage(page: number) {
  if (page < 6 || page > 17) return properties[0] ?? null
  return properties[Math.floor((page - 6) / 2)] ?? null
}

function usePageSize() {
  const [size, setSize] = useState({ w: 380, h: 530 })

  useEffect(() => {
    const calc = () => {
      const vw = window.visualViewport?.width ?? window.innerWidth
      const vh = window.visualViewport?.height ?? window.innerHeight
      const phone = vw < 700
      const tablet = vw >= 700 && vw < 1100
      const padX = phone ? 18 : tablet ? 56 : 120
      const padY = phone ? 118 : tablet ? 140 : 168
      const maxBookW = Math.max(vw - padX, 280)
      const maxBookH = Math.max(vh - padY, 320)
      const w = Math.min(maxBookW / 2, maxBookH * 0.72, phone ? 360 : 500)
      const h = Math.min(w / 0.72, maxBookH)
      setSize({ w, h })
    }
    calc()
    window.addEventListener('resize', calc)
    window.visualViewport?.addEventListener('resize', calc)
    return () => {
      window.removeEventListener('resize', calc)
      window.visualViewport?.removeEventListener('resize', calc)
    }
  }, [])

  return size
}

export default function App() {
  const [lang, setLang] = useState<Lang>('id')
  const [page, setPage] = useState(0)
  const [preview, setPreview] = useState<Property | null>(null)
  const size = usePageSize()
  const property = useMemo(() => propertyForPage(page), [page])

  return (
    <div className="app">
      <Scene property={property} hidden={Boolean(preview)} />
      <div className="grain" />
      <div className="vignette" />

      <header className="topbar">
        <a className="brand" href="https://ibasa.co.id" target="_blank" rel="noreferrer">
          <img src="/ibasa-logo.png" alt="" />
          <span className="brand-meta">
            <strong>IBASA</strong>
            <span>Integrasi Bangun Perkasa</span>
          </span>
        </a>
        <div className="lang-switch" role="group" aria-label="Language">
          <button type="button" className={lang === 'id' ? 'active' : ''} onClick={() => setLang('id')}>
            ID
          </button>
          <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
            EN
          </button>
        </div>
      </header>

      <section className="catalogue">
        <FlipCatalogue
          lang={lang}
          width={size.w}
          height={size.h}
          current={page}
          onPage={setPage}
          onPreview={setPreview}
        />
        <p className="prototype-pill">{copy.prototype[lang]}</p>
      </section>
      {preview ? <Preview3D property={preview} lang={lang} onClose={() => setPreview(null)} /> : null}
    </div>
  )
}
