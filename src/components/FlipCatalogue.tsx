import { useEffect, useRef } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { properties, type Lang, type Property } from '../data/properties'
import { copy } from '../i18n'
import {
  ContactPage,
  Contents,
  CoverBack,
  CoverFront,
  Endpaper,
  Manifesto,
  PropertyDetails,
  PropertyPhoto,
  RegionMap,
  TitlePage,
} from './pages'

type BookRef = {
  pageFlip: () => {
    flipNext: () => void
    flipPrev: () => void
    flip: (page: number) => void
    turnToPage: (page: number) => void
    getCurrentPageIndex: () => number
    getPageCount: () => number
  }
}

export function FlipCatalogue({
  lang,
  width,
  height,
  onPage,
  current,
  onPreview,
}: {
  lang: Lang
  width: number
  height: number
  onPage: (page: number) => void
  current: number
  onPreview: (property: Property) => void
}) {
  const book = useRef<BookRef>(null)
  const currentRef = useRef(current)
  currentRef.current = current

  const jump = (page: number) => {
    book.current?.pageFlip().flip(page)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector('.preview-3d')) return
      if (e.key === 'ArrowRight') book.current?.pageFlip().flipNext()
      if (e.key === 'ArrowLeft') book.current?.pageFlip().flipPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const api = book.current?.pageFlip()
      if (!api) return
      const next = currentRef.current > 0 ? currentRef.current : 1
      api.turnToPage(next)
      onPage(next)
    }, 160)
    return () => window.clearTimeout(timer)
  }, [width, height, lang, onPage])

  return (
    <>
      <div className="book-stage">
        <div className="book-board">
          <div className="book-spine" aria-hidden />
          <div className="ribbon" />
          <HTMLFlipBook
          ref={book}
          key={`${Math.round(width)}-${Math.round(height)}-${lang}`}
          className="ibasa-book"
          style={{}}
          width={width}
          height={height}
          size="fixed"
          minWidth={width}
          maxWidth={width}
          minHeight={height}
          maxHeight={height}
          drawShadow
          flippingTime={900}
          usePortrait={false}
          startZIndex={1}
          autoSize
          maxShadowOpacity={0.65}
          showCover
          mobileScrollSupport
          clickEventForward
          useMouseEvents
          swipeDistance={40}
          showPageCorners
          disableFlipByClick={false}
          startPage={1}
          onInit={() => onPage(1)}
          onFlip={(e) => onPage(e.data)}
        >
          <CoverFront lang={lang} />
          <Endpaper lang={lang} />
          <TitlePage lang={lang} />
          <Manifesto lang={lang} />
          <Contents lang={lang} onJump={jump} />
          <RegionMap lang={lang} />
          {properties.flatMap((p) => [
            <PropertyPhoto key={`${p.id}-photo`} lang={lang} property={p} />,
            <PropertyDetails key={`${p.id}-copy`} lang={lang} property={p} onPreview={onPreview} />,
          ])}
          <ContactPage lang={lang} />
          <CoverBack lang={lang} />
        </HTMLFlipBook>
        </div>
      </div>
      <nav className="chrome" aria-label="Catalogue">
        <button
          type="button"
          className="nav-btn"
          aria-label={copy.prev[lang]}
          onClick={() => book.current?.pageFlip().flipPrev()}
          disabled={current <= 0}
        >
          ‹
        </button>
        <div className="page-ind">
          {current <= 0
            ? copy.page[lang] + ' 1'
            : `${copy.page[lang]} ${current + 1}–${Math.min(current + 2, 20)}`}{' '}
          {copy.of[lang]} 20
        </div>
        <button
          type="button"
          className="nav-btn"
          aria-label={copy.next[lang]}
          onClick={() => book.current?.pageFlip().flipNext()}
          disabled={current >= 19}
        >
          ›
        </button>
      </nav>
    </>
  )
}
