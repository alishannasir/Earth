import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10)
camera.position.z = 2
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.IcosahedronGeometry(1.0, 2)
const material = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    flatShading: true
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.3
controls.enableZoom = false

const wirematerial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const wiremesh = new THREE.Mesh(geometry, wirematerial)
wiremesh.scale.setScalar(1.001)
mesh.add(wiremesh)

// const pointLight = new THREE.PointLight(0xffffff, 0.5, 10, 2)
// pointLight.position.set(0, 0, 0)
// scene.add(pointLight)   

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
// directionalLight.position.set(1, 1, 0)
// scene.add(directionalLight)

const henLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.9)
scene.add(henLight)

const animate = (t=0) => {
  requestAnimationFrame(animate)
  mesh.rotation.y += 0.001
  renderer.render(scene, camera)
  controls.update()
}
animate()

