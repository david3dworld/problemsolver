import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box3, Color, DirectionalLight, LoadingManager, PointLight, Texture, Vector3 } from "three";
import { useSpring, animated } from '@react-spring/three'
import travelHistory from "../files/my-flights.json";
import airportHistory from "../files/my-airports.json";
import ThreeGlobe from "three-globe";
import CameraControls from "../CameraControls/cameraControls"
import backgroundImg from "../../../../assets/images/CanvasBackground.png"
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { Flow } from 'three/addons/modifiers/CurveModifier.js';
// import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import * as THREE from 'three'
import TextModel from "./TextModel";

const Background = () => {
    const { scene } = useThree();

    function downloadImg(imgSrc) {
        return new Promise((resolve, reject) => {
          const img = document.createElement('img');
          img.crossOrigin = true;
          img.onerror = (e) => reject(e);
          img.onload = () => resolve(img);
          img.src = imgSrc;
        });
      }
    
    useEffect(() => {
        downloadImg(backgroundImg).then(img => {
            let texture = new Texture();
            texture.image = img;
            texture.needsUpdate = true;
            scene.background = texture;
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return null;
  }

const ModelViewer = (props) => {
    const {videoEnded} = props
    const { gl , scene, camera} = useThree();
    const globeRef = useRef();
    const cameraRef = useRef();
    const perCameraRef = useRef();
    const [listTextInfo, setListTextInfo] = useState([])
    const { rotation: rotationGlobe } = useSpring({
        rotation: videoEnded ? [0, Math.PI * 2, 0] : [0, 0, 0],
        from: { rotation:[0, 0, 0]},
        config: { duration: 2000 },
    })

    useLayoutEffect(() => {
        if(gl){
            gl.setSize(window.innerWidth * 0.8, window.innerHeight);
            gl.setPixelRatio(window.devicePixelRatio);
        }
    }, [gl])

    useLayoutEffect(() => {
        if(perCameraRef.current){
            var dLight = new DirectionalLight('#ffffff', 0.8);
            dLight.position.set(-800, 2000, 400);
            perCameraRef.current.add(dLight);

            var dLight1 = new DirectionalLight('#7982f6', 1);
            dLight1.position.set(-200, 500, 200);
            perCameraRef.current.add(dLight1);

            var dLight2 = new PointLight('#8566cc', 0.5);
            dLight2.position.set(-200, 500, 200);
            perCameraRef.current.add(dLight2);
        }
    }, [perCameraRef])

    useEffect(() => {
        setUpCameraControl()
        initGlobe()
        // setListTextCover([])
        initGlobeObj()
        initTexts()
    }, [])

    const setUpCameraControl = () => {
        cameraRef.current.setPosition(0,100,220)
        cameraRef.current.minDistance = 180;
        cameraRef.current.maxDistance = 400;
        cameraRef.current.polarRotateSpeed = 0.8;

        cameraRef.current.minPolarAngle = Math.PI / 3.5;
        cameraRef.current.maxPolarAngle = Math.PI - Math.PI / 3;
    }

    const initGlobeObj = () => {
      loadModel('/model/Planet.obj').then(obj => {
        const mat = new THREE.MeshBasicMaterial({
          color: 0xC177FF,
          toneMapped: false,
          emissiveIntensity: 2
        })
        obj.children.forEach(el => {
          if(el.name !== "Box001"){
            el.material = mat
          } else {
            el.material.transparent = true;
            el.material.opacity = 0
          }
        })
        obj.scale.set(3.2, 3.2, 3.2)
        obj.rotation.set( 0, - Math.PI / 1.8, 0)
        globeRef.current.add(obj)
      })
    }

    const loadModel = url => {
      return new Promise(resolve => {
        const manager = new LoadingManager()
        const loader = new OBJLoader(manager)
        loader.load(
          url,
          function (data) {
            resolve(data)
          },
          e => {},
        )
      })
    }

    function initGlobe() {
        // Initialize the Globe
        const Globe = new ThreeGlobe({
          waitForGlobeReady: true,
          animateIn: true,
        })
          .globeImageUrl('/images/earth-night1.jpg')
          .bumpImageUrl('/images/earth-night1.jpg')
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
              // return e.status ? "#9cff00" : "#FF4000";
              return "#FFFF00"
            })
            .arcAltitude((e) => {
              return e.arcAlt;
            })
            .arcStroke((e) => {
              // return e.status ? 0.5 : 0.3;
              return 2
            })
            .arcDashLength(1)
            .arcDashGap(10)
            .arcDashAnimateTime(1000)
            .arcsTransitionDuration(1000)
            .arcDashInitialGap((e) => e.order * 1)
            // .labelsData(airportHistory.airports)
            // .labelColor(() => "#ffcb21")
            // .labelDotOrientation((e) => {
            //   return e.text === "ALA" ? "top" : "right";
            // })
            // .labelDotRadius(0.3)
            // .labelSize((e) => e.size)
            // .labelText("city")
            // .labelResolution(6)
            // .labelAltitude(0.01)
            // .pointsData(airportHistory.airports)
            // .pointColor(() => "#ffffff")
            // .pointsMerge(true)
            // .pointAltitude(0.07)
            // .pointRadius(0.05);
        }, 1000);
    
        Globe.rotateY(-Math.PI * (5 / 9));
        // Globe.rotateZ(-Math.PI / 6);
        const globeMaterial = Globe.globeMaterial();
        globeMaterial.color = new Color(0x3a228a);
        globeMaterial.emissive = new Color(0x220038);
        globeMaterial.emissiveIntensity = 0.1;
        globeMaterial.shininess = 0;
    
        // NOTE Cool stuff
        // globeMaterial.wireframe = true;
    
        // scene.add(Globe);

        globeRef.current.add(Globe)
    }

    const initTexts = () => {
        const dis1 = 75
        const y1 = 10
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
        const y2 = 15
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

        const dis4 = 65
        const y4 = 50
        const initialPoints4 = [
          { x: 0, y: y4, z: -dis4 * Math.sqrt(2) },
          { x: dis4, y: y4, z: - dis4 },
          { x: dis4 * Math.sqrt(2), y: y4, z: 0 },
          { x: dis4, y: y4, z: dis4 },
          { x: 0, y: y4, z: dis4 * Math.sqrt(2) },
          { x: - dis4, y: y4, z: dis4 },
          { x: -dis4 * Math.sqrt(2), y: y4, z: 0 },
          { x: - dis4, y: y4, z: - dis4 },
        ];
    
        const loader = new FontLoader();
        loader.load( '/font/helvetiker_regular.typeface.json', function ( font ) {
          setListTextInfo([
            {
              text: '3D models',
              points: initialPoints.map(p => new Vector3(p.x, p.y, p.z)),
              font: font,
              fontSize: 15,
              moveCurve: 0.75,
              textCoverInfo: {
                position: new Vector3(-30, -20, -95),
                rotation: new Vector3(0, Math.PI / 24, 0)
              },
              sectionId: 'section3DModels'
            },
            {
              text: 'Book a call!',
              points: initialPoints4.map(p => new Vector3(p.x, p.y, p.z)),
              font: font,
              fontSize: 15,
              moveCurve: 0.8,
              textCoverInfo: {
                position: new Vector3( 0, 46, -88),
                rotation: new Vector3(0, Math.PI / 48, 0)
              },
              sectionId: 'sectionBookACall'
            },
            {
              text: '3D website',
              points: initialPoints2.map(p => new Vector3(p.x, p.y, p.z)),
              font: font,
              fontSize: 15,
              moveCurve: 0.4,
              textCoverInfo: {
                position: new Vector3(-20, 45, 100),
                rotation: new Vector3(0, - Math.PI / 18, 0)
              },
              sectionId: 'section3DWebsite'
            },
            {
              text: '3D video',
              points: initialPoints3.map(p => new Vector3(p.x, p.y, p.z)),
              font: font,
              fontSize: 15,
              moveCurve: 0.55,
              textCoverInfo: {
                position: new Vector3(-96, 32, 10),
                rotation: new Vector3(0, Math.PI / 2 + Math.PI / 20, 0)
              },
              sectionId: 'section3DVideo'
            }
          ])
        } );
    }

    const onClickTextCover = (e) => {
      if(e.object?.userData?.sectionId){
        let element = document.getElementById(e.object.userData.sectionId)
        if(element){
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    }

    const shouldRunAnimate = useRef(true);
    const debounce = (fn, d) => {
      let timer;
      return function(){
          let context = this;
          let args = arguments;

          if(shouldRunAnimate.current){
            console.log('runn')
            fn.apply(context, args);
          }
          shouldRunAnimate.current = false

          clearTimeout(timer);
          timer = setTimeout(() => {
              shouldRunAnimate.current = true
          }, d);
      }
    }

    return <>
        <CameraControls ref={cameraRef}/>
        <fog color={new Color('#535ef3')} near={200} far={2000}/>
        <perspectiveCamera
            ref={perCameraRef}
            aspect={window.innerWidth / window.innerHeight}
        />
        <animated.group ref={globeRef} rotation={rotationGlobe}>
            {listTextInfo  && listTextInfo.map((el, index) => (
              <TextModel 
              key={index}
              points={el.points}
              text={el.text}
              font={el.font}
              fontSize={el.fontSize}
              moveCurve={el.moveCurve}
              textCoverInfo={el.textCoverInfo}
              sectionId={el.sectionId}
              onClickTextCover={debounce(onClickTextCover, 200)}
              />
            ))}
        </animated.group>
        <ambientLight intensity={0.3} color={new Color('#bbbbbb')}/>
        <hemisphereLight intensity={0.3}/>
    </>
}
export default ModelViewer