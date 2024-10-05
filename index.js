import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { getFresnelMat } from './src/getFresnelMat'

const scene = new THREE.Scene()
scene.fog = new THREE.FogExp2(0x050530, 0.001)

// Starfield
const StarGeometry = new THREE.BufferGeometry()
const vertices = []
const size = 2000
for (let i = 0; i < size; i++) {
    const x = Math.random() * size - size / 2
    const y = Math.random() * size - size / 2
    const z = Math.random() * size - size / 2
    vertices.push(x, y, z)
}
StarGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

const StarMaterial = new THREE.PointsMaterial({
    size: 0.5,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: 0xffffff
})

const ParticalMesh = new THREE.Points(StarGeometry, StarMaterial)
scene.add(ParticalMesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Earth
const earthGroup = new THREE.Group()
scene.add(earthGroup)

const loader = new THREE.TextureLoader()
const Geometry = new THREE.IcosahedronGeometry(1.01, 12)
const earthMaterial = new THREE.MeshStandardMaterial({ 
    map: loader.load('./textures/00_earthmap1k.jpg')
})
const EarthMesh = new THREE.Mesh(Geometry, earthMaterial)
earthGroup.add(EarthMesh)

const fresnelMat = getFresnelMat()
const  glowMesh = new THREE.Mesh(Geometry,fresnelMat)
scene.add(glowMesh)

// Clouds (slightly larger sphere)
const cloudsMaterial = new THREE.MeshStandardMaterial({
    map: loader.load('./textures/04_earthcloudmap.jpg'),
    blending:THREE.AdditiveBlending,
})
const CloudsMesh = new THREE.Mesh(Geometry, cloudsMaterial)
earthGroup.add(CloudsMesh)
// CityLight

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)



// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.3
controls.enableZoom = false

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// Animation loop
const animate = (t = 0) => {
  requestAnimationFrame(animate)
  EarthMesh.rotation.y += 0.001
  CloudsMesh.rotation.y += 0.001 // Rotate clouds
  glowMesh.rotation.y += 0.001
  controls.update()
  renderer.render(scene, camera)
}
animate()
