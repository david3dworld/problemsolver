import { Canvas, useThree } from '@react-three/fiber'
import { Color } from 'three'
import ModelViewer from './ModelViewer'

const GlobeModel = (props) => {
    const {videoEnded} = props
    return (
        <Canvas
            gl={{
                antialias: true,
                alpha: true,
            }}
            style={{
                width: '80vw'
            }}
        >
            <ModelViewer videoEnded={videoEnded}/>
        </Canvas>
    )
}
export default GlobeModel