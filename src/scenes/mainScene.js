import * as THREE from 'three';
import { createLight } from '../utils/helpers';

export function createMainScene(scene) {
    // Add lights to the scene
    const ambientLight = createLight('ambient', 0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = createLight('directional', 0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const pointLight = createLight('point', 0x4ecdc4, 0.3);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Create 3D Laptop with more detail
    const laptop = new THREE.Group();
    
    // Laptop base (bottom part)
    const baseGeometry = new THREE.BoxGeometry(8, 0.4, 5.5);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2c2c2c,
        metalness: 0.8,
        roughness: 0.2
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1.4;
    laptop.add(base);
    
    // Laptop base edge (for more realistic look)
    const baseEdgeGeometry = new THREE.BoxGeometry(8.2, 0.1, 5.7);
    const baseEdgeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        metalness: 0.9,
        roughness: 0.1
    });
    const baseEdge = new THREE.Mesh(baseEdgeGeometry, baseEdgeMaterial);
    baseEdge.position.y = -1.15;
    laptop.add(baseEdge);
    
    // Laptop screen back (thicker for realism) - Less tilt for better readability
    const screenBackGeometry = new THREE.BoxGeometry(7.8, 5.2, 0.3);
    const screenBackMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        metalness: 0.8,
        roughness: 0.2
    });
    const screenBack = new THREE.Mesh(screenBackGeometry, screenBackMaterial);
    screenBack.position.set(0, 1.5, -2.3);
    screenBack.rotation.x = 0.05; // Reduced tilt - almost face-on
    laptop.add(screenBack);
    
    // Screen bezel (black border around screen)
    const bezelGeometry = new THREE.PlaneGeometry(7.2, 4.6);
    const bezelMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x000000
    });
    const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
    bezel.position.set(0, 1.5, -2.15);
    bezel.rotation.x = 0.05; // Reduced tilt - almost face-on
    laptop.add(bezel);
    
    // Laptop screen (the interactive part) - with subtle glow
    const screenGeometry = new THREE.PlaneGeometry(6.8, 4.2);
    const screenMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x001155,
        transparent: true,
        opacity: 0.9
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 1.5, -2.1);
    screen.rotation.x = 0.05; // Reduced tilt - almost face-on
    laptop.add(screen);
    
    // Add subtle screen glow effect
    const glowGeometry = new THREE.PlaneGeometry(7.2, 4.6);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x4488ff,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(0, 1.5, -2.08);
    glow.rotation.x = 0.05; // Reduced tilt - almost face-on
    laptop.add(glow);
    
    // Keyboard area
    const keyboardAreaGeometry = new THREE.BoxGeometry(6.5, 0.05, 3.8);
    const keyboardAreaMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2a2a2a 
    });
    const keyboardArea = new THREE.Mesh(keyboardAreaGeometry, keyboardAreaMaterial);
    keyboardArea.position.set(0, -1.25, 0.3);
    laptop.add(keyboardArea);
    
    // Individual keys (simplified grid)
    const keyGeometry = new THREE.BoxGeometry(0.35, 0.1, 0.35);
    const keyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        metalness: 0.1,
        roughness: 0.8
    });
    
    // Create keyboard keys in a grid
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 15; col++) {
            const key = new THREE.Mesh(keyGeometry, keyMaterial);
            key.position.set(
                (col - 7) * 0.4,
                -1.15,
                (row - 2.5) * 0.4 + 0.3
            );
            laptop.add(key);
        }
    }
    
    // Trackpad
    const trackpadGeometry = new THREE.BoxGeometry(2.2, 0.02, 1.6);
    const trackpadMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        metalness: 0.3,
        roughness: 0.7
    });
    const trackpad = new THREE.Mesh(trackpadGeometry, trackpadMaterial);
    trackpad.position.set(0, -1.22, 1.9);
    laptop.add(trackpad);
    
    // Trackpad border
    const trackpadBorderGeometry = new THREE.RingGeometry(0.8, 1.2, 32);
    const trackpadBorderMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x444444,
        side: THREE.DoubleSide
    });
    const trackpadBorder = new THREE.Mesh(trackpadBorderGeometry, trackpadBorderMaterial);
    trackpadBorder.position.set(0, -1.21, 1.9);
    trackpadBorder.rotation.x = -Math.PI / 2;
    laptop.add(trackpadBorder);
    
    // Laptop logo on screen back (optional brand detail)
    const logoGeometry = new THREE.CircleGeometry(0.3, 32);
    const logoMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff6b35,
        transparent: true,
        opacity: 0.8
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 4, -2.4);
    logo.rotation.x = 0.05;
    laptop.add(logo);

    // Position the laptop - centered and slightly angled for aesthetic
    laptop.position.set(0, 0, 0);
    laptop.rotation.y = 0; // Face camera directly for better readability
    scene.add(laptop);

    // Store laptop reference for interaction
    scene.userData.laptop = laptop;
    scene.userData.screen = screen;

    return scene;
}