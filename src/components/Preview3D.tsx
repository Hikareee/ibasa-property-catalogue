import { Component, useEffect, type ErrorInfo, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls, Sparkles } from '@react-three/drei'
import { typeLabel, type Lang, type Property } from '../data/properties'
import { copy } from '../i18n'
import { Building } from './Building'

class SceneGuard extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('3D preview disabled', error, info.componentStack)
  }

  render() {
    if (this.state.failed) {
      return <p className="preview-fallback">3D</p>
    }
    return this.props.children
  }
}

export function Preview3D({
  property,
  lang,
  onClose,
}: {
  property: Property
  lang: Lang
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      e.stopPropagation()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [onClose])

  return (
    <div className="preview-3d" role="dialog" aria-modal="true" aria-labelledby="preview-title">
      <button type="button" className="preview-backdrop" aria-label={copy.close[lang]} onClick={onClose} />
      <div className="preview-panel">
        <header className="preview-head">
          <div>
            <p className="small-kicker">
              {property.code} · {typeLabel[property.type][lang]}
            </p>
            <h2 id="preview-title">{property.name[lang]}</h2>
            <p className="loc">{property.location[lang]}</p>
          </div>
          <button type="button" className="preview-close" onClick={onClose}>
            {copy.close[lang]}
          </button>
        </header>
        <div className="preview-stage">
          <SceneGuard>
            <Canvas key={property.id} camera={{ position: [3.2, 2.1, 5.4], fov: 40 }} dpr={[1, 1.75]}>
              <color attach="background" args={['#07111f']} />
              <fog attach="fog" args={['#07111f', 10, 22]} />
              <ambientLight intensity={0.7} />
              <directionalLight position={[4, 6, 5]} intensity={1.4} color="#fff4e0" />
              <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#6d8cff" />
              <Sparkles count={40} scale={[8, 4, 6]} size={2} speed={0.2} color="#e8d5a3" opacity={0.45} />
              <Building config={property.massing} />
              <ContactShadows position={[0, -1.05, 0]} opacity={0.45} scale={12} blur={2.2} far={5} />
              <OrbitControls
                enablePan={false}
                minDistance={3}
                maxDistance={10}
                autoRotate
                autoRotateSpeed={0.6}
              />
            </Canvas>
          </SceneGuard>
        </div>
        <p className="preview-hint">{copy.previewHint[lang]}</p>
      </div>
    </div>
  )
}
