import * as THREE from 'https://unpkg.com/three@0.141.0/build/three.module.js'






//Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('texture/NormalMap.png')



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.IcosahedronBufferGeometry(0.5);

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.6
material.roughness = 0.4
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xff0000, 0.5)
pointLight.position.x = 1
pointLight.position.y = 1
pointLight.position.z = 1
scene.add(pointLight)

// Light 2 Navy

const pointLight2 = new THREE.PointLight(0xffff, 0.5)
pointLight2.position.set(-6, -3, -3)
pointLight2.intensity = 1

scene.add(pointLight2)

// const light1 = gui


// light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
// light1.add(pointLight2.position, 'x').min(-6).max(3).step(0.01)
// light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
// light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
    // scene.add(pointLightHelper)

// Light 3 maroon

const pointLight3 = new THREE.PointLight(0xffff, 2)
pointLight2.position.set(-1, 1, 2)
pointLight2.intensity = 1

scene.add(pointLight3)

// const light2 = gui

// light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
// light2.add(pointLight3.position, 'x').min(-6).max(3).step(0.01)
// light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
// light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

const light2Color = {
    color: 0xff0000
}

// light2.addColor(light2Color, 'color')
//     .onChange(() => {
//         pointLight3.color.set(light2Color.color)

//     })


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1.8
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)




const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

onDocumentMouseMove = (event) => {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}



document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseX = (event.clientX - windowY)

}





const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .003
}

window.addEventListener('scroll', updateSphere);


const clock = new THREE.Clock()

const tick = () => {



    targetX = mouseX * .008
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime


    sphere.rotation.y += .2 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .2 * (targetY - sphere.rotation.x)
    sphere.position.z += .2 * (targetY - sphere.position.z)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



// GSAP




gsap.from(".stagger", { duration: 0.3, opacity: 0, stagger: .2 });


// const timeline = gsap.timeline({ defaults: { duration: 0.5 } })
// timeline
//     .from('.index-header', { y: '-100%', ease: 'bounce', opacity: 0 })
//     .from('.stagger', { opacity: 0, stagger: .3 })
// const button = document.querySelector('.button')

// .from('.right', { x: '-100vw', ease: 'power2.in' }, 1)
//     .from('.left', { x: '-100%' }, '<.5')
//     .to('.footer', { y: 0, ease: 'elastic' })
//     .fromTo('.button', { opacity: 0, scale: 0, rotation: 720 }, { opacity: 1, scale: 1, rotation: 0 })