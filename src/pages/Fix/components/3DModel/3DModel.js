import { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import CameraControls from "../CameraControls/cameraControls"
import { Box3, Color, DoubleSide, Texture } from 'three'
import backgroundImg from "../../../../assets/images/CanvasBackground.png"

function Scene({modelRotate}) {
    const cameraRef = useRef();
    const modelRef = useRef();
    const gltf = useLoader(GLTFLoader, '/model/NvidiaRTX3090.glb')
    const { gl } = useThree();

    useLayoutEffect(() => {
        if(gl){
            gl.setSize(window.innerWidth, window.innerHeight);
            gl.setPixelRatio(window.devicePixelRatio);
        }
    }, [gl])

    useEffect(() => {
        fitCameraToObject(cameraRef.current, gltf.scene)
    }, [gltf])
    

    useFrame(() => {
        if(modelRef && modelRef.current && modelRotate){
            modelRef.current.rotation.y += Math.PI/300
        }
    })

    function fitCameraToObject(
        controls, 
        sceneMeshes, 
        padding = {
            paddingTop: 2,
            paddingLeft: 2,
            paddingBottom: 2,
            paddingRight: 2,
        }
    ) {

        sceneMeshes.updateMatrixWorld()
        const box = new Box3().setFromObject(sceneMeshes);

        const modelWidth = box.max.z - box.min.z;
        const modelHeight = box.max.y - box.min.y;
        const fitPadding = {
            paddingTop: padding.paddingTop * modelHeight,
            paddingLeft: padding.paddingLeft * modelWidth,
            paddingBottom: padding.paddingBottom * modelHeight,
            paddingRight: padding.paddingRight * modelWidth
        }

        if(controls){
            controls.fitToBox(box, false, fitPadding);
        }

        controls.minDistance = 5;
        controls.maxDistance = 10;

        setTimeout(() => {
            if(controls){
                controls.saveState();
            }
        }, 100);
    }

    gltf.scene.children.forEach((mesh, i) => {
        mesh.castShadow = true;
    })
    gltf.scene.castShadow = true;

    return (
      <Suspense fallback={null}>
        <CameraControls ref={cameraRef}/>
        <primitive ref={modelRef} object={gltf.scene}/>
      </Suspense>
    )
}

const Model3D = ({modelRotate}) => {
    return (
        <Canvas>
            <Suspense fallback={null}>
                <Scene modelRotate={modelRotate}/>
                {/* <color attach='background' args={['#dfdfdf']}/> */}
                {/* <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} receiveShadow>
                    <cylinderGeometry attach="geometry" args={[5, 5, 0.01, 32]} />
                    <meshStandardMaterial attach="material" color="white" />
                </mesh> */}
                <Environment preset="sunset" />
            </Suspense>
        </Canvas>
    )
}

export default Model3D