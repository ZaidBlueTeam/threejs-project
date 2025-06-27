import * as THREE from 'three';

class Renderer {
    constructor() {
        this.renderer = null;
    }

    initialize(canvas) {
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    render(scene, camera) {
        this.renderer.render(scene, camera);
    }
    
    setSize(width, height) {
        this.renderer.setSize(width, height);
    }
}

export default Renderer;