import * as THREE from 'https://unpkg.com/three@0.141.0/build/three.module.js';

// Main optimized implementation
(function() {
    // Initialize Three.js components
    const canvas = document.querySelector('canvas.webgl');
    const scene = new THREE.Scene();
    
    // Create geometries for both shapes
    const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 1);
    const planeGeometry = new THREE.PlaneGeometry(3, 3);
    
    // Create material
    const material = new THREE.MeshBasicMaterial({
        color: 0x4f8fe6,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    
    // Create mesh
    const mesh = new THREE.Mesh(icosahedronGeometry, material);
    scene.add(mesh);
    
    // Track state
    let isSquare = false;
    
    // Setup lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x4facfe, 0.5);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
    });
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 3;
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Initial sizing
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Mouse interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Handle mouse movement
    function onMouseMove(event) {
        mouseX = (event.clientX - window.innerWidth / 2);
        mouseY = (event.clientY - window.innerHeight / 2);
    }
    
    window.addEventListener('mousemove', onMouseMove);
    
    // Handle scroll
    function onScroll() {
        mesh.position.y = window.scrollY * 0.001;
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Calculate target rotation based on mouse position
        targetX = mouseX * 0.0005;
        targetY = mouseY * 0.0005;
        
        // Apply rotation
        mesh.rotation.y += 0.5 * (targetX - mesh.rotation.y * 0.05);
        mesh.rotation.x += 0.5 * (targetY - mesh.rotation.x * 0.05);
        mesh.rotation.z += 0.001;
        
        // Render the scene
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
})();