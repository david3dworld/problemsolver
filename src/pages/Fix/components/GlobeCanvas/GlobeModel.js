import { Canvas, useThree } from '@react-three/fiber'
import { Color } from 'three'
import ModelViewer from './ModelViewer'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, Selection } from '@react-three/postprocessing'

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
            <EffectComposer>
                <Bloom luminanceThreshold={0} luminanceSmoothing={0.6} height={200} />
            </EffectComposer>
            <ModelViewer videoEnded={videoEnded}/>
        </Canvas>
    )
}
export default GlobeModel