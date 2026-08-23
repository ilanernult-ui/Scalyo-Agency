import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../../lib/motion'

/* ------------------------------------------------------------------ */
/*  Paramètres du réseau                                               */
/* ------------------------------------------------------------------ */
const NODE_COUNT = 100 // plafonné
const CONNECT_DIST = 2.3 // seuil de liaison entre nœuds
const SPREAD = { x: 13, y: 7.5, z: 8 } // dispersion dans l'espace

const C_VIOLET = new THREE.Color('#8B5CF6')
const C_BLUE = new THREE.Color('#3B5BFF')
const C_CYAN = new THREE.Color('#22B4FF')

/** Texture d'un point rond et doux (halo radial), générée une fois. */
function makeDotTexture(): THREE.Texture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.85)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** Couleur d'un nœud selon sa position horizontale : violet → bleu → cyan. */
function colorForX(x: number): THREE.Color {
  const t = THREE.MathUtils.clamp(x / SPREAD.x + 0.5, 0, 1)
  const c = new THREE.Color()
  if (t < 0.5) c.lerpColors(C_VIOLET, C_BLUE, t / 0.5)
  else c.lerpColors(C_BLUE, C_CYAN, (t - 0.5) / 0.5)
  return c
}

/* ------------------------------------------------------------------ */
/*  Réseau                                                             */
/* ------------------------------------------------------------------ */
function Network({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })

  // Positions, couleurs, liaisons et texture — calculés une seule fois.
  const { pointsGeo, linesGeo, dotTex } = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3)
    const colors = new Float32Array(NODE_COUNT * 3)
    const nodes: THREE.Vector3[] = []

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * SPREAD.x
      const y = (Math.random() - 0.5) * SPREAD.y
      const z = (Math.random() - 0.5) * SPREAD.z
      positions.set([x, y, z], i * 3)
      const c = colorForX(x)
      colors.set([c.r, c.g, c.b], i * 3)
      nodes.push(new THREE.Vector3(x, y, z))
    }

    // Liaisons : segments entre nœuds proches, colorés à leurs extrémités.
    const linePos: number[] = []
    const lineCol: number[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodes[i].distanceTo(nodes[j]) < CONNECT_DIST) {
          const a = nodes[i]
          const b = nodes[j]
          linePos.push(a.x, a.y, a.z, b.x, b.y, b.z)
          lineCol.push(
            colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2],
            colors[j * 3], colors[j * 3 + 1], colors[j * 3 + 2],
          )
        }
      }
    }

    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const linesGeo = new THREE.BufferGeometry()
    linesGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePos), 3))
    linesGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(lineCol), 3))

    return { pointsGeo, linesGeo, dotTex: makeDotTexture() }
  }, [])

  // Libère les ressources GPU au démontage.
  useEffect(() => {
    return () => {
      pointsGeo.dispose()
      linesGeo.dispose()
      dotTex.dispose()
    }
  }, [pointsGeo, linesGeo, dotTex])

  // Parallaxe souris : position normalisée -1..1 (écoute globale, marche aussi sous le texte).
  useEffect(() => {
    if (reduced) return
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced])

  useFrame((state, delta) => {
    const g = group.current
    if (!g || reduced) return

    // Dérive/rotation lente et continue.
    g.rotation.y += delta * 0.045
    g.rotation.x += delta * 0.012

    // Parallaxe douce : la caméra suit légèrement le curseur.
    const cam = state.camera
    cam.position.x += (pointer.current.x * 0.6 - cam.position.x) * 0.03
    cam.position.y += (-pointer.current.y * 0.4 - cam.position.y) * 0.03
    cam.lookAt(0, 0, 0)
  })

  return (
    <group ref={group}>
      <points geometry={pointsGeo}>
        <pointsMaterial
          size={0.13}
          map={dotTex}
          vertexColors
          transparent
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Canvas                                                             */
/* ------------------------------------------------------------------ */
export default function HeroCanvas() {
  const reduced = usePrefersReducedMotion()

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      // En mode réduit, la scène est statique : un seul rendu à la demande.
      frameloop={reduced ? 'demand' : 'always'}
    >
      {/* Profondeur : les nœuds lointains s'estompent dans le fond sombre. */}
      <fog attach="fog" args={['#050506', 5.5, 16]} />
      <Network reduced={reduced} />
    </Canvas>
  )
}
