declare module 'react-pageflip' {
  import type { CSSProperties, ReactElement, ReactNode, Ref } from 'react'

  export interface IEventProps {
    onFlip?: (flipEvent: { data: number }) => void
    onChangeOrientation?: (flipEvent: { data: 'portrait' | 'landscape' }) => void
    onChangeState?: (flipEvent: { data: string }) => void
    onInit?: (flipEvent: { data: { page: number; mode: string } }) => void
    onUpdate?: (flipEvent: { data: { page: number; mode: string } }) => void
  }

  export interface HTMLFlipBookProps extends IEventProps {
    className?: string
    style?: CSSProperties
    children?: ReactNode
    width: number
    height: number
    size?: 'fixed' | 'stretch'
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
    drawShadow?: boolean
    flippingTime?: number
    usePortrait?: boolean
    startZIndex?: number
    autoSize?: boolean
    maxShadowOpacity?: number
    showCover?: boolean
    mobileScrollSupport?: boolean
    clickEventForward?: boolean
    useMouseEvents?: boolean
    swipeDistance?: number
    showPageCorners?: boolean
    disableFlipByClick?: boolean
    startPage?: number
    renderOnlyPageLengthChange?: boolean
  }

  export interface PageFlipApi {
    flipNext: () => void
    flipPrev: () => void
    flip: (page: number) => void
    turnToPage: (page: number) => void
    getCurrentPageIndex: () => number
    getPageCount: () => number
  }

  const HTMLFlipBook: (
    props: HTMLFlipBookProps & { ref?: Ref<{ pageFlip: () => PageFlipApi }> },
  ) => ReactElement | null

  export default HTMLFlipBook
}
