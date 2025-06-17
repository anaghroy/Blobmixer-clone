// Import required libraries and assets
import "./style.css";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import vertexShader from "./shaders/vertex.glsl";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils";
// import GUI from "lil-gui";
import { Text } from "troika-three-text";
import textVertex from "./shaders/textVertex.glsl";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

// Set up asset loaders
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const rgbeLoader = new RGBELoader(loadingManager);

// Define responsive breakpoints
const MOBILE_BREAKPOINT = 480;
const TABLET_BREAKPOINT = 768;

// Define blob configurations with visual properties
const blobs = [
  {
    name: "Fomosphere",
    background: "#75BCC6",
    config: {
      uPositionFrequency: 1.1,
      uPositionStrength: 0.3,
      uSmallWavePositionFrequency: 0.5,
      uSmallWavePositionStrength: 0.7,
      roughness: 0.5,
      metalness: 1,
      envMapIntensity: 0.5,
      clearcoat: 0.5,
      clearcoatRoughness: 0.5,
      transmission: 0.3,
      flatShading: false,
      wireframe: false,
      map: "hologram",
    },
  },
  {
    name: "Discobrain", 
    background: "#9D73F7",
    config: {
      uPositionFrequency: 3,
      uPositionStrength: 1.2,
      uSmallWavePositionFrequency: 0.7,
      uSmallWavePositionStrength: 0.2,
      roughness: 1,
      metalness: 0,
      envMapIntensity: 0.2,
      clearcoat: 0.4,
      clearcoatRoughness: 0,
      transmission: 0,
      flatShading: false,
      wireframe: false,
      map: "cd",
    },
  },
  {
    name: "Twistertoy",
    background: "#536C9B", 
    config: {
      uPositionFrequency: 1.2,
      uPositionStrength: 0.7,
      uSmallWavePositionFrequency: 2,
      uSmallWavePositionStrength: 0.6,
      roughness: 0.5,
      metalness: 0.6,
      envMapIntensity: 0.65,
      clearcoat: 0.5,
      clearcoatRoughness: 0.5,
      transmission: 0.3,
      flatShading: false,
      wireframe: false,
      map: "purple-rain",
    },
  },
  {
    name: "Fungible",
    background: "#8FD8A5",
    config: {
      uPositionFrequency: 0.3,
      uPositionStrength: 0.9,
      uSmallWavePositionFrequency: 5,
      uSmallWavePositionStrength: 0.3,
      roughness: 0.5,
      metalness: 0.2,
      envMapIntensity: 0.65,
      clearcoat: 0.1,
      clearcoatRoughness: 0.5,
      transmission: 0.3,
      flatShading: false,
      wireframe: false,
      map: "iridescent",
    },
  },
  {
    name: "Metalness",
    background: "#371B53",
    config: {
      uPositionFrequency: 0.1,
      uPositionStrength: 0.1,
      uSmallWavePositionFrequency: 2.8,
      uSmallWavePositionStrength: 0.5,
      roughness: 0.5,
      metalness: 0.2,
      envMapIntensity: 0.65,
      clearcoat: 0.1,
      clearcoatRoughness: 0,
      transmission: 0.3,
      flatShading: false,
      wireframe: false,
      map: "synthwave",
    },
  },
  {
    name: "Metagum",
    background: "#99AAE6",
    config: {
      uPositionFrequency: 0.1,
      uPositionStrength: 0.3,
      uSmallWavePositionFrequency: 1.4,
      uSmallWavePositionStrength: 0.5,
      roughness: 0.5,
      metalness: 0.2,
      envMapIntensity: 0.65,
      clearcoat: 0.1,
      clearcoatRoughness: 0,
      transmission: 0.3,
      flatShading: false,
      wireframe: false,
      map: "sunset-vibes",
    },
  },
  {
    name: "Purple Mirror",
    background: "#5300B1",
    config: {
      uPositionFrequency: 0.584,
      uPositionStrength: 0.276,
      uSmallWavePositionFrequency: 0.899,
      uSmallWavePositionStrength: 1.266,
      roughness: 0,
      metalness: 1,
      envMapIntensity: 2,
      clearcoat: 0,
      clearcoatRoughness: 0,
      transmission: 0,
      flatShading: false,
      wireframe: false,
      map: "deep-ocean",
    },
  },
  {
    name: "Alien Goo",
    background: "#45ACD8",
    config: {
      uPositionFrequency: 1.022,
      uPositionStrength: 0.99,
      uSmallWavePositionFrequency: 0.378,
      uSmallWavePositionStrength: 0.341,
      roughness: 0.292,
      metalness: 0.73,
      envMapIntensity: 0.86,
      clearcoat: 1,
      clearcoatRoughness: 0,
      transmission: 0,
      flatShading: false,
      wireframe: false,
      map: "lucky-day",
    },
  },
  {
    name: "Firefly",
    background: "#380B16",
    config: {
      uPositionFrequency: 1.7,
      uPositionStrength: 0.2,
      uSmallWavePositionFrequency: 0.378,
      uSmallWavePositionStrength: 0.341,
      roughness: 0.292,
      metalness: 0.73,
      envMapIntensity: 0.86,
      clearcoat: 1,
      clearcoatRoughness: 0,
      transmission: 0,
      flatShading: false,
      wireframe: false,
      map: "passion",
    },
  },
  {
    name: "Lipsync",
    background: "#180075",
    config: {
      uPositionFrequency: 1.7,
      uPositionStrength: 0.2,
      uSmallWavePositionFrequency: 0.378,
      uSmallWavePositionStrength: 0.341,
      roughness: 0.292,
      metalness: 0.73,
      envMapIntensity: 0.86,
      clearcoat: 1,
      clearcoatRoughness: 0,
      transmission: 0,
      flatShading: false,
      wireframe: false,
      map: "imaginarium",
    },
  },
  {
    name: "Liquidity",
    background: "#FDB38A",
    config: {
      uPositionFrequency: 1.1,
      uPositionStrength: 0.9,
      uSmallWavePositionFrequency: 0.1,
      uSmallWavePositionStrength: 0.7,
      roughness: 0.292,
      metalness: 0.73,
      envMapIntensity: 0.86,
      clearcoat: 1,
      clearcoatRoughness: 0,
      transmission: 0,
      flatShading: false,
      wireframe: false,
      map: "sunset-vibes",
    },
  },
];

// Animation state tracking
let isAnimating = false;
let currentIndex = 0;
let hasScrolled = false;

// Set up Three.js scene, camera and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color("#333");

// Set up responsive camera parameters
const getFOV = () => {
  if (window.innerWidth <= MOBILE_BREAKPOINT) return 90;
  if (window.innerWidth <= TABLET_BREAKPOINT) return 80;
  return 75;
};

const getZPosition = () => {
  if (window.innerWidth <= MOBILE_BREAKPOINT) return 4;
  if (window.innerWidth <= TABLET_BREAKPOINT) return 3.5;
  return 3;
};

const camera = new THREE.PerspectiveCamera(
  getFOV(),
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
  antialias: true,
});

// Configure renderer settings
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

// Define shader uniforms for animation
const uniforms = {
  uTime: { value: 0 },
  uPositionFrequency: { value: blobs[currentIndex].config.uPositionFrequency },
  uPositionStrength: { value: blobs[currentIndex].config.uPositionStrength },
  uTimeFrequency: { value: 0.2 },
  uSmallWavePositionFrequency: {
    value: blobs[currentIndex].config.uSmallWavePositionFrequency,
  },
  uSmallWavePositionStrength: {
    value: blobs[currentIndex].config.uSmallWavePositionStrength,
  },
  uSmallWaveTimeFrequency: { value: 0.1 },
};

// Create custom shader material
const material = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhysicalMaterial,
  map: textureLoader.load(`./gradients/${blobs[currentIndex].config.map}.png`),
  roughness: blobs[currentIndex].config.roughness,
  metalness: blobs[currentIndex].config.metalness,
  envMapIntensity: blobs[currentIndex].config.envMapIntensity,
  clearcoat: blobs[currentIndex].config.clearcoat,
  clearcoatRoughness: blobs[currentIndex].config.clearcoatRoughness,
  transmission: blobs[currentIndex].config.transmission,
  flatShading: blobs[currentIndex].config.flatShading,
  wireframe: blobs[currentIndex].config.wireframe,
  vertexShader,
  uniforms,
});

// Set up debug GUI
// const gui = new GUI();
// gui
//   .add(uniforms.uPositionFrequency, "value", 0, 5, 0.1)
//   .name("Position Frequency");
// gui
//   .add(uniforms.uPositionStrength, "value", 0, 2, 0.1)
//   .name("Position Strength");
// gui.add(uniforms.uTimeFrequency, "value", 0, 5, 0.1).name("Time Frequency");
// gui
//   .add(uniforms.uSmallWavePositionFrequency, "value", 0, 5, 0.1)
//   .name("Small Wave Position Frequency");
// gui
//   .add(uniforms.uSmallWavePositionStrength, "value", 0, 2, 0.1)
//   .name("Small Wave Position Strength");
// gui
//   .add(uniforms.uSmallWaveTimeFrequency, "value", 0, 5, 0.1)
//   .name("Small Wave Time Frequency");

// Create geometry for the blob
const getGeometryDetail = () => {
  if (window.innerWidth <= MOBILE_BREAKPOINT) return 40;
  if (window.innerWidth <= TABLET_BREAKPOINT) return 55;
  return 70;
};

const mergedGeometry = mergeVertices(new THREE.IcosahedronGeometry(1, getGeometryDetail()));
mergedGeometry.computeTangents();

// Create mesh and add to scene
const sphere = new THREE.Mesh(mergedGeometry, material);
scene.add(sphere);

// Position camera
camera.position.z = getZPosition();

// Load and configure environment map
rgbeLoader.load("./HDRI/studio_small_08_2k.hdr", function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
});

// Set up animation clock
const clock = new THREE.Clock();

// Create text material with custom shader
const textMaterial = new THREE.ShaderMaterial({
  fragmentShader: `void main() {gl_FragColor = vec4(1.0);}`,
  vertexShader: textVertex,
  side: THREE.DoubleSide,
  uniforms: {
    progress: { value: 0.0 },
    direction: { value: 1 },
  },
});

// Get responsive text size
const getTextSize = () => {
  if (window.innerWidth <= MOBILE_BREAKPOINT) return window.innerWidth / 3000;
  if (window.innerWidth <= TABLET_BREAKPOINT) return window.innerWidth / 5000;
  return window.innerWidth / 2000;
};

// Create text meshes for each blob
const texts = blobs.map((blobs, index) => {
  const myText = new Text();
  myText.text = blobs.name;
  myText.font = `./Fonts/aften_screen.woff`;
  myText.anchorX = "center";
  myText.anchorY = "middle";
  myText.material = textMaterial;
  myText.position.set(0, 0, 2);
  if (index !== 0) myText.scale.set(0, 0, 0);
  myText.letterSpacing = -0.08;
  myText.fontSize = getTextSize();
  myText.glyphGeometryDetail = 20;
  myText.sync();
  scene.add(myText);
  return myText;
});

// Handle scroll interactions
const progressBar = document.querySelector("#progress-bar");

window.addEventListener("wheel", (event) => {
  if (isAnimating) return;
  isAnimating = true;
  let direction = Math.sign(event.deltaY);
  let next = (currentIndex + direction + blobs.length) % blobs.length;

  // Show progress bar on first scroll
  if (!hasScrolled) {
    hasScrolled = true;
    progressBar.style.display = "block";
    progressBar.style.width = "5%";
    progressBar.style.transition = "width 0.8s ease-in-out";
    progressBar.style.backgroundColor = "#0f172a";
  }

  // Update progress indicator
  const progress = ((next + 1) / blobs.length) * 100;
  progressBar.style.width = `${progress}%`;

  // Animate text transitions
  texts[next].scale.set(1, 1, 1);
  texts[next].position.x = direction * 3.5;

  gsap.to(textMaterial.uniforms.progress, {
    value: 0.5,
    duration: 2,
    ease: "linear",
    onComplete: () => {
      currentIndex = next;
      isAnimating = false;
      textMaterial.uniforms.progress.value = 0;
    },
  });

  // Animate text positions
  gsap.to(texts[currentIndex].position, {
    x: -direction * 3,
    duration: 1,
    ease: "power2.inOut",
  });

  // Rotate sphere
  gsap.to(sphere.rotation, {
    y: sphere.rotation.y + Math.PI * 4 * -direction,
    duration: 1,
    ease: "power2.inOut",
  });

  gsap.to(texts[next].position, {
    x: 0,
    duration: 1,
    ease: "power2.inOut",
  });

  // Transition background color
  const bg = new THREE.Color(blobs[next].background);
  gsap.to(scene.background, {
    r: bg.r,
    g: bg.g,
    b: bg.b,
    duration: 1,
    ease: "linear",
  });
  updateBlob(blobs[next].config);
});

// Update blob configuration with animations
function updateBlob(config) {
  if (config.uPositionFrequency !== undefined)
    gsap.to(material.uniforms.uPositionFrequency, {
      value: config.uPositionFrequency,
      duration: 1,
      ease: "power2.inOut",
    });
  if (config.uPositionStrength !== undefined)
    gsap.to(material.uniforms.uPositionStrength, {
      value: config.uPositionStrength,
      duration: 1,
      ease: "power2.inOut",
    });
  if (config.uSmallWavePositionFrequency !== undefined)
    gsap.to(material.uniforms.uSmallWavePositionFrequency, {
      value: config.uSmallWavePositionFrequency,
      duration: 1,
      ease: "power2.inOut",
    });
  if (config.uSmallWavePositionStrength !== undefined)
    gsap.to(material.uniforms.uSmallWavePositionStrength, {
      value: config.uSmallWavePositionStrength,
      duration: 1,
      ease: "power2.inOut",
    });
  if (config.uSmallWaveTimeFrequency !== undefined)
    gsap.to(material.uniforms.uSmallWaveTimeFrequency, {
      value: config.uSmallWaveTimeFrequency,
      duration: 1,
      ease: "power2.inOut",
    });
  if (config.map !== undefined) {
    setTimeout(() => {
      material.map = textureLoader.load(`./gradients/${config.map}.png`);
    }, 400);
  }
  if (config.roughness !== undefined)
    gsap.to(material, {
      roughness: config.roughness,
      duration: 1,
      ease: "power2.inOut",
    });
  if (config.metalness !== undefined)
    gsap.to(material, {
      metalness: config.metalness,
      duration: 1,
      ease: "power2.inOut",
    });
  if (config.envMapIntensity !== undefined)
    gsap.to(material, {
      envMapIntensity: config.envMapIntensity,
      duration: 1,
      ease: "power2.inOut",
    });
  if (config.clearcoat !== undefined)
    gsap.to(material, {
      clearcoat: config.clearcoat,
      duration: 1,
      ease: "power2.inOut",
    });
  if (config.clearcoatRoughness !== undefined)
    gsap.to(material, {
      clearcoatRoughness: config.clearcoatRoughness,
      duration: 1,
      ease: "power2.inOut",
    });
  if (config.transmission !== undefined)
    gsap.to(material, {
      transmission: config.transmission,
      duration: 1,
      ease: "power2.inOut",
    });
  if (config.flatShading !== undefined)
    gsap.to(material, {
      flatShading: config.flatShading,
      duration: 1,
      ease: "power2.inOut",
    });
  if (config.wireframe !== undefined)
    gsap.to(material, {
      wireframe: config.wireframe,
      duration: 1,
      ease: "power2.inOut",
    });
}

// Handle asset loading completion
loadingManager.onLoad = () => {
  // Start animation loop
  function animate() {
    requestAnimationFrame(animate);
    // Update time uniform
    uniforms.uTime.value = clock.getElapsedTime();
    // Render scene
    renderer.render(scene, camera);
  }
  const bg = new THREE.Color(blobs[currentIndex].background);
  gsap.to(scene.background, {
    r: bg.r,
    g: bg.g,
    b: bg.b,
    duration: 1,
    ease: "power2.inOut",
  });
  animate();
};

// Handle window resizing
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Update camera parameters based on screen size
  camera.fov = getFOV();
  camera.position.z = getZPosition();
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Update text sizes
  texts.forEach(text => {
    text.fontSize = getTextSize();
    text.sync();
  });
});
