import ThreeGlobe from "three-globe";
import { WebGLRenderer, Scene, BoxGeometry, Mesh, Raycaster, Vector3, Group, BoxHelper, Box3Helper, Box3, BufferGeometry } from "three";
import * as THREE from 'three'
import {
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  Color,
  Fog,
  PointLight,
  Vector2,
  MeshBasicMaterial
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { createGlowMesh } from "three-glow-mesh";
import countries from "./files/globe-data-min.json";
import travelHistory from "./files/my-flights.json";
import airportHistory from "./files/my-airports.json";
import { useEffect, useRef } from "react";
import { Flow } from 'three/addons/modifiers/CurveModifier.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const GlobeCanvas = () => {
  const canvasContainer = useRef()

  const ACTION_SELECT = 1, ACTION_NONE = 0;
  let renderer, camera, scene, controls, rayCaster, flow, flow2, flow3, flow4, action = ACTION_NONE;
  // let mouseX = 0;
  // let mouseY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  let Globe;
  const curveHandles = [];
  let mouse;

  const gData = ["Book a call!", "3D Models", "3D video", "3D website"].map((el) => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: 5,
    color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    text: el
  }));


  // SECTION Initializing core ThreeJS elements
  function init() {
    // Initialize renderer
    renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.outputEncoding = THREE.sRGBEncoding;
    canvasContainer.current.appendChild(renderer.domElement);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener( 'pointerdown', onPointerDown );
    

    // Initialize scene, light
    scene = new Scene();
    scene.add(new AmbientLight(0xbbbbbb, 0.3));
    scene.background = new Color(0x040d21);

    // Initialize camera, light
    camera = new PerspectiveCamera();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    var dLight = new DirectionalLight(0xffffff, 0.8);
    dLight.position.set(-800, 2000, 400);
    camera.add(dLight);

    var dLight1 = new DirectionalLight(0x7982f6, 1);
    dLight1.position.set(-200, 500, 200);
    camera.add(dLight1);

    var dLight2 = new PointLight(0x8566cc, 0.5);
    dLight2.position.set(-200, 500, 200);
    camera.add(dLight2);

    camera.position.z = 400;
    camera.position.x = 0;
    camera.position.y = 0;

    scene.add(camera);

    // Additional effects
    scene.fog = new Fog(0x535ef3, 400, 2000);

    // Helpers
    // const axesHelper = new AxesHelper(800);
    // scene.add(axesHelper);
    // var helper = new DirectionalLightHelper(dLight);
    // scene.add(helper);
    // var helperCamera = new CameraHelper(dLight.shadow.camera);
    // scene.add(helperCamera);

    // Initialize controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dynamicDampingFactor = 0.01;
    controls.enablePan = false;
    controls.minDistance = 200;
    controls.maxDistance = 500;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 1;
    controls.autoRotate = false;

    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    rayCaster = new Raycaster()
    // rayCaster.params.Points.threshold = 1
    mouse = new Vector2()

    window.addEventListener("resize", onWindowResize, false);
  }

  // SECTION Globe
  function initGlobe() {
    // Initialize the Globe
    Globe = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
      .globeImageUrl('/images/earth-night.jpg')
      .bumpImageUrl('/images/earth-night.jpg')
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor("#3a228a")
      .atmosphereAltitude(0.25)
      .hexPolygonColor((e) => {
        if (
          ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
            e.properties.ISO_A3
          )
        ) {
          return "rgba(255,255,255, 1)";
        } else return "rgba(255,255,255, 0.7)";
      })
      ;

    // NOTE Arc animations are followed after the globe enters the scene
    setTimeout(() => {
      Globe.arcsData(travelHistory.flights)
        .arcColor((e) => {
          return e.status ? "#9cff00" : "#FF4000";
        })
        .arcAltitude((e) => {
          return e.arcAlt;
        })
        .arcStroke((e) => {
          return e.status ? 0.5 : 0.3;
        })
        .arcDashLength(0.9)
        .arcDashGap(4)
        .arcDashAnimateTime(1000)
        .arcsTransitionDuration(1000)
        .arcDashInitialGap((e) => e.order * 1)
        .labelsData(airportHistory.airports)
        .labelColor(() => "#ffcb21")
        .labelDotOrientation((e) => {
          return e.text === "ALA" ? "top" : "right";
        })
        .labelDotRadius(0.3)
        .labelSize((e) => e.size)
        .labelText("city")
        .labelResolution(6)
        .labelAltitude(0.01)
        .pointsData(airportHistory.airports)
        .pointColor(() => "#ffffff")
        .pointsMerge(true)
        .pointAltitude(0.07)
        .pointRadius(0.05);
    }, 1000);

    Globe.rotateY(-Math.PI * (5 / 9));
    Globe.rotateZ(-Math.PI / 6);
    const globeMaterial = Globe.globeMaterial();
    globeMaterial.color = new Color(0x3a228a);
    globeMaterial.emissive = new Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.7;

    // NOTE Cool stuff
    // globeMaterial.wireframe = true;

    scene.add(Globe);
  }


  function cpBox(obj){
    const box = new Box3()
    const positions = obj.geometry.getAttribute('position').array
    for (let i = 0; i < positions.length; i+=3) {
      box.expandByPoint(new Vector3(positions[i], positions[i+1], positions[i+2]))
    }
    return box
  }


  function createFlowObject(text, points, font, fontSize, moveCurve, textCoverInfo){
    const curve = new THREE.CatmullRomCurve3(points);
    curve.curveType = 'centripetal';
    curve.closed = true;

    const geometry1 = new TextGeometry( text, {
      font: font,
      size: fontSize,
      height: 1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 5,
    } );

    geometry1.rotateX( Math.PI );
    geometry1.rotateY( Math.PI );

    const material = new THREE.MeshStandardMaterial( {
      color: 0x00ff00
    } );

    const objectToCurve = new THREE.Mesh( geometry1, material );

    flow = new Flow( objectToCurve );
    flow.updateCurve( 0, curve );
    flow.moveAlongCurve( moveCurve );
    flow.object3D.userData = {text: '3D models', isText: true}

    const obj = flow.object3D
    scene.add(obj)

    if(textCoverInfo){
      const box = cpBox(obj)
      const coverGeometry = new BoxGeometry(box.max.x - box.min.x, box.max.y - box.min.y, box.max.z - box.min.z)
      const mesh = new Mesh(coverGeometry, new MeshBasicMaterial({color: 0x00ff00}))
      mesh.position.set(textCoverInfo.position.x, textCoverInfo.position.y, textCoverInfo.position.z)
      mesh.rotation.set(textCoverInfo.rotation.x, textCoverInfo.rotation.y, textCoverInfo.rotation.z)
      mesh.userData = {type: 'TextCover', text: text}
      mesh.visible = false
      scene.add(mesh)
    }
    

    return obj
  }

  const initTexts = () => {
    const dis1 = 75
    const y1 = -30
    const initialPoints = [
      { x: 0, y: y1, z: -dis1 * Math.sqrt(2) },
      { x: dis1, y: y1, z: - dis1 },
      { x: dis1 * Math.sqrt(2), y: y1, z: 0 },
      { x: dis1, y: y1, z: dis1 },
      { x: 0, y: y1, z: dis1 * Math.sqrt(2) },
      { x: - dis1, y: y1, z: dis1 },
      { x: -dis1 * Math.sqrt(2), y: y1, z: 0 },
      { x: - dis1, y: y1, z: - dis1 },
    ];

    const dis2 = 75
    const y2 = 30
    const initialPoints2 = [
      { x: 0, y: y2, z: -dis2 * Math.sqrt(2) },
      { x: dis2, y: y2, z: - dis2 },
      { x: dis2 * Math.sqrt(2), y: y2, z: 0 },
      { x: dis2, y: y2, z: dis2 },
      { x: 0, y: y2, z: dis2 * Math.sqrt(2) },
      { x: - dis2, y: y2, z: dis2 },
      { x: -dis2 * Math.sqrt(2), y: y2, z: 0 },
      { x: - dis2, y: y2, z: - dis2 },
    ];

    const dis3 = 80
    const y3 = 0
    const initialPoints3 = [
      { x: 0, y: y3, z: -dis3 * Math.sqrt(2) },
      { x: dis3, y: y3, z: - dis3 },
      { x: dis3 * Math.sqrt(2), y: y3, z: 0 },
      { x: dis3, y: y3, z: dis3 },
      { x: 0, y: y3, z: dis3 * Math.sqrt(2) },
      { x: - dis3, y: y3, z: dis3 },
      { x: -dis3 * Math.sqrt(2), y: y3, z: 0 },
      { x: - dis3, y: y3, z: - dis3 },
    ];

    const loader = new FontLoader();
    loader.load( '/font/helvetiker_regular.typeface.json', function ( font ) {
      createFlowObject('3D models', initialPoints.map(p => new Vector3(p.x, p.y, p.z)), font, 15, 0, {
        position: new Vector3(85, -22, - 50),
        rotation: new Vector3(0, Math.PI / 2 + Math.PI / 6, 0)
      })
      createFlowObject('Book a call!', initialPoints2.map(p => new Vector3(p.x, p.y, p.z)), font, 15, 0.04, {
        position: new Vector3(95, 38, - 28),
        rotation: new Vector3(0, Math.PI / 2 + Math.PI / 9, 0)
      })
      createFlowObject('3D website', initialPoints2.map(p => new Vector3(p.x, p.y, p.z)), font, 15, 0.5,{
        position: new Vector3(-85, 38, 55),
        rotation: new Vector3(0, Math.PI / 2 + Math.PI / 6, 0)
      })
      createFlowObject('3D video', initialPoints3.map(p => new Vector3(p.x, p.y, p.z)), font, 15, 0.75,{
        position: new Vector3(-55, 8, -93),
        rotation: new Vector3(0, Math.PI / 6, 0)
      })
    } );
  }

  function onMouseMove(event) {

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  function onPointerDown( event ) {

    action = ACTION_SELECT;
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    rayCaster.setFromCamera( mouse, camera );

    const items = scene.children.filter(el => el.userData?.type === 'TextCover')
    const intersects = rayCaster.intersectObjects( items, true );
    if(intersects.length > 0){
      const object = intersects[0].object;
      const objectText = object.userData?.text
      if(objectText){
        alert(`Click on ${objectText}`)
      }
    }
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    windowHalfX = window.innerWidth / 1.5;
    windowHalfY = window.innerHeight / 1.5;
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    // camera.position.x +=
    //   Math.abs(mouseX) <= windowHalfX / 2
    //     ? (mouseX / 2 - camera.position.x) * 0.005
    //     : 0;
    // camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005;
    // camera.lookAt(scene.position);
    // controls.update();
    // if ( flow ) {
    //   flow.moveAlongCurve( 0.001 );
    // }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

    useEffect(() => {
      if(!scene){
        init();
        initGlobe();
        initTexts()
        onWindowResize();
        animate();
      }
    }, [])
    return (
        <div ref={canvasContainer}></div>
    )
}
export default GlobeCanvas;