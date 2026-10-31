import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { MassingConfig } from '../data/properties'

export function Building({
  config,
  spin = false,
}: {
  config: MassingConfig
  spin?: boolean
}) {
  const group = useRef<THREE.Group>(null)
  useFrame((_, d) => {
    if (spin && group.current) group.current.rotation.y += d * 0.12
  })

  const slabs = useMemo(() => {
    if (config.kind !== 'commercial') return null
    return [0, 1, 2, 3, 4, 5].map((i) => ({
      x: -1.2 + i * 0.42,
      h: 1.1 + (i % 3) * 0.18,
      w: 0.38,
    }))
  }, [config.kind])

  return (
    <group ref={group} position={[0, -0.1, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#0a1628" roughness={1} />
      </mesh>
      <gridHelper args={[8, 16, '#1d4ed8', '#13233f']} position={[0, 0.01, 0]} />

      {config.kind === 'land' ? (
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[config.width, 0.08, config.depth]} />
          <meshStandardMaterial color={config.body} roughness={0.95} />
        </mesh>
      ) : config.kind === 'commercial' && slabs ? (
        slabs.map((s) => (
          <mesh key={s.x} position={[s.x, s.h / 2, 0]}>
            <boxGeometry args={[s.w, s.h, 1.15]} />
            <meshStandardMaterial color={config.body} roughness={0.55} metalness={0.08} />
          </mesh>
        ))
      ) : (
        <>
          <mesh position={[0, config.height / 2, 0]}>
            <boxGeometry args={[config.width, config.height, config.depth]} />
            <meshStandardMaterial color={config.body} roughness={0.5} metalness={0.12} />
          </mesh>
          {config.kind === 'factory' && (
            <mesh position={[config.width * 0.28, config.height + 0.35, 0]}>
              <cylinderGeometry args={[0.12, 0.16, 0.7, 12]} />
              <meshStandardMaterial color="#8a6d2f" metalness={0.4} roughness={0.4} />
            </mesh>
          )}
        </>
      )}

      {config.annex && (
        <mesh position={[config.width * 0.42, 0.28, config.depth * 0.55]}>
          <boxGeometry args={[0.7, 0.55, 0.55]} />
          <meshStandardMaterial color={config.accent} roughness={0.4} />
        </mesh>
      )}

      {config.yard &&
        [-1.2, -0.4, 0.4].map((x) => (
          <mesh key={x} position={[x, 0.12, config.depth * 0.7 + 0.35]}>
            <boxGeometry args={[0.55, 0.22, 0.28]} />
            <meshStandardMaterial color="#1d4ed8" metalness={0.3} roughness={0.35} />
          </mesh>
        ))}
    </group>
  )
}
