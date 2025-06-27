import * as THREE from 'three';

export function createCube(size, color) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({ color: color });
    const cube = new THREE.Mesh(geometry, material);
    return cube;
}

export function createLight(type, color, intensity) {
    let light;
    if (type === 'ambient') {
        light = new THREE.AmbientLight(color, intensity);
    } else if (type === 'point') {
        light = new THREE.PointLight(color, intensity);
    } else if (type === 'directional') {
        light = new THREE.DirectionalLight(color, intensity);
    }
    return light;
}