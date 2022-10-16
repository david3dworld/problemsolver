
import { useEffect, useRef, useState } from "react"
import GlobeModel from "./components/GlobeCanvas/GlobeModel"
import GlobeCanvas from "./components/Globe"
import "./styles.css"
import websiteImg from "../../assets/images/Soba0001.png"
import Model3D from "./components/3DModel/3DModel"
import ImageCarousel from "./components/Carousel/Carousel"
const Fix = () => {
    const introVideoRef = useRef()
    const [isVideoEnd, setIsVideoEnd] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);

        return () => {
            window.removeEventListener('scroll', toggleVisible);
        }
    })

    const onVideoIntroEnd = () => {
        introVideoRef.current.style.display = 'none'
        setIsVideoEnd(true)
    }

    const [visible, setVisible] = useState(false)
  
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
        setVisible(true)
        } 
        else if (scrolled <= 300){
        setVisible(false)
        }
    };
    
    const scrollToTop = () =>{
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    };

    return (
    <>
        {visible && <button className="scroll-to-top-button" onClick={() => {scrollToTop()}}>
            {'Back to top >'}
        </button>}
        <section>
            <video ref={introVideoRef} autoPlay muted id="introVideo" onEnded={() => {onVideoIntroEnd()}}>
                <source src="/video/Intro.mp4" type="video/mp4" />
            </video>
            <GlobeModel videoEnded={isVideoEnd}/>
        </section>
        <section id="section3DWebsite">
            {/* <img src={websiteImg} alt='' className="image-full"/> */}
            <video autoPlay muted loop className="video-full">
                <source src="/video/3D Website.mp4" type="video/mp4" />
            </video>
        </section>
        <section id="section3DVideo">
            <video autoPlay muted loop className="video-full">
                <source src="/video/Solver_reel.mp4" type="video/mp4" />
            </video>
        </section>
        <section id="section3DModels">
            <Model3D />
        </section>
        <section>
            <ImageCarousel />
        </section>
        {/* <section id="sectionBookACall">
            <div style={{color: 'black'}}>
                Book a call!
            </div>
        </section> */}
    </>
    )
}
export default Fix