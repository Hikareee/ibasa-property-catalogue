import { Canvas } from '@react-three/fiber'
import { ContactShadows, Float, Sparkles } from '@react-three/drei'
import { Component, type ErrorInfo, type ReactNode } from 'react'
import type { Property } from '../data/properties'
import { Building } from './Building'

class SceneGuard extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('3D scene disabled', error, info.componentStack)
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

export function Scene({
  property,
  hidden = false,
}: {
  property: Property | null
  hidden?: boolean
}) {
  if (hidden) return null

  return (
    <SceneGuard>
      <div className="scene-layer">
          <Canvas
          camera={{ position: [0.2, 1.35, 6.2], fov: 36 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#07111f']} />
          <fog attach="fog" args={['#07111f', 12, 22]} />
          <ambientLight intensity={0.75} />
          <directionalLight position={[4, 6, 5]} intensity={1.45} color="#fff4e0" />
          <directionalLight position={[-5, 2, -3]} intensity={0.55} color="#6d8cff" />
          <Sparkles count={45} scale={[10, 5, 8]} size={2} speed={0.22} color="#e8d5a3" opacity={0.45} />
          {property ? (
            <Float speed={0.8} floatIntensity={0.16} rotationIntensity={0.04}>
              <group position={[0, 0.12, 0]} rotation={[0.16, -0.38, 0]}>
                <Building key={property.id} config={property.massing} spin />
              </group>
            </Float>
          ) : null}
          <ContactShadows position={[0, -1.05, 0]} opacity={0.42} scale={12} blur={2.3} far={5} />
        </Canvas>
      </div>
    </SceneGuard>
  )
}
