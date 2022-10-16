import { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import CameraControls from "../CameraControls/cameraControls"
import { Box3, Color } from 'three'

function Scene() {
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
        if(modelRef && modelRef.current){
            modelRef.current.rotation.y += Math.PI/300
        }
    })

    function fitCameraToObject(
        controls, 
        sceneMeshes, 
        padding = {
            paddingTop: 1,
            paddingLeft: 1,
            paddingBottom: 1,
            paddingRight: 1,
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

        setTimeout(() => {
            if(controls){
                controls.saveState();
            }
        }, 100);
    }

    return (
      <Suspense fallback={null}>
        <CameraControls ref={cameraRef}/>
        <primitive ref={modelRef} object={gltf.scene} />
      </Suspense>
    )
}

const Model3D = () => {
    return (
        <div className="App">
        <Canvas>
            <Suspense fallback={null}>
                <Scene />
                <color attach='background' args={['black']}/>
                <Environment preset="sunset" />
            </Suspense>
        </Canvas>
        </div>
    )
}

export default Model3D