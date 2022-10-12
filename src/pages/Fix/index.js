
import { useRef } from "react"
import GlobeCanvas from "./components/Globe"
import "./styles.css"
const Fix = () => {
    const introVideoRef = useRef()

    const onVideoIntroEnd = () => {
        introVideoRef.current.style.display = 'none'
    }
    return (
    <div>
        <video ref={introVideoRef} autoPlay muted id="introVideo" onEnded={() => {onVideoIntroEnd()}}>
            <source src="/video/Intro.mp4" type="video/mp4" />
        </video>
        <GlobeCanvas />
    </div>
    )
}
export default Fix