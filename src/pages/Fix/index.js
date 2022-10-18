
import { useEffect, useRef, useState } from "react"
import GlobeModel from "./components/GlobeCanvas/GlobeModel"
import GlobeCanvas from "./components/Globe"
import "./styles.css"
import websiteImg from "../../assets/images/Soba0001.png"
import Model3D from "./components/3DModel/3DModel"
import ImageCarousel from "./components/Carousel/Carousel"
const Fix = () => {
    const introVideoRef = useRef()
    const video3DWebsiteRef = useRef()
    const video3DRef = useRef()
    const imagesRef = useRef()
    const [isVideoEnd, setIsVideoEnd] = useState(false)
    const [visible, setVisible] = useState(false)
    const [show3DVideoDescription, setShow3DVideoDescription] = useState(false)
    const [modelRotate, setModelRotate] = useState(false)
    const [showTextAnimate3DVideo, setShowTextAnimate3DVideo] = useState(false)
    const [showTextAnimate3DModel, setShowTextAnimate3DModel] = useState(false)
    const [showTextAnimate3DImage, setShowTextAnimate3DImage] = useState(false)
    const [showTextAnimateBook, setShowTextAnimateBook] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);

        return () => {
            window.removeEventListener('scroll', toggleVisible);
        }
    }, [visible, show3DVideoDescription, modelRotate, showTextAnimate3DVideo, showTextAnimate3DModel, showTextAnimate3DImage, showTextAnimateBook])

    const onVideoIntroEnd = () => {
        introVideoRef.current.style.display = 'none'
        setIsVideoEnd(true)
    }
  
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
            setVisible(true)
        } 
        else if (scrolled <= 300){
            setVisible(false)
        }

        const section3DTop = document.querySelector('#section3DWebsite')?.getBoundingClientRect()?.top
        if(section3DTop && section3DTop < window.innerHeight / 2){
            video3DWebsiteRef.current.play()
        } else {
            if(video3DWebsiteRef.current.currentTime !== 0){
                video3DWebsiteRef.current.pause()
                video3DWebsiteRef.current.currentTime = 0
                setShow3DVideoDescription(false)
            }
        }

        const section3DModelTop = document.querySelector('#section3DModels')?.getBoundingClientRect()?.top
        if(section3DModelTop && section3DModelTop < window.innerHeight / 2){
            if(!modelRotate){
                setModelRotate(true)
            }
            if(!showTextAnimate3DModel){
                setShowTextAnimate3DModel(true)
            }
        } else {
            if(modelRotate){
                setModelRotate(false)
            }
            if(showTextAnimate3DModel){
                setShowTextAnimate3DModel(false)
            }
        }

        const section3DVideoTop = document.querySelector('#section3DVideo')?.getBoundingClientRect()?.top
        if(section3DVideoTop && section3DVideoTop < window.innerHeight / 2){
            video3DRef.current.play()
            if(!showTextAnimate3DVideo){
                setShowTextAnimate3DVideo(true)
            }
        } else {
            if(video3DRef.current.currentTime !== 0){
                video3DRef.current.pause()
                video3DRef.current.currentTime = 0
                setShow3DVideoDescription(false)
            }
            if(showTextAnimate3DVideo){
                setShowTextAnimate3DVideo(false)
            }
        }

        const section3DImageTop = document.querySelector('#sectionImages')?.getBoundingClientRect()?.top
        if(section3DImageTop && section3DImageTop < window.innerHeight / 2){
            if(!showTextAnimate3DImage){
                setShowTextAnimate3DImage(true)
            }
        } else {
            if(showTextAnimate3DImage){
                setShowTextAnimate3DImage(false)
            }
        }

        const sectionBookTop = document.querySelector('#sectionBookACall')?.getBoundingClientRect()?.top
        if(sectionBookTop && sectionBookTop < window.innerHeight / 2){
            if(!showTextAnimateBook){
                setShowTextAnimateBook(true)
            }
        } else {
            if(showTextAnimateBook){
                setShowTextAnimateBook(false)
            }
        }
    };

    const onVideo3DPlay = (e) => {
        if(e.target.currentTime > 8){
            if(!show3DVideoDescription){
                setShow3DVideoDescription(true)
            }
        }
        
    }
    
    const scrollToTop = () =>{
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    };

    const textStyle = {
        fontSize: 'inherit',
        lineHeight: 'inherit'
    }

    const scrollToRoom = () => {
        let element = document.getElementById("sectionImages")
        if(element){
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
    }

    return (
    <>
        {visible && <button className="scroll-to-top-button" onClick={() => {scrollToTop()}}>
            {'Back to top >'}
        </button>}
        <section className="sectionGlobe" style={{
            background: `url('images/CanvasBackground.png')`,
            backgroundSize: '100% 100%',
            position: 'relative'
        }}>
            <video ref={introVideoRef} autoPlay muted id="introVideo" onEnded={() => {onVideoIntroEnd()}}>
                <source src="/video/Intro.mp4" type="video/mp4" />
            </video>
            <GlobeModel videoEnded={isVideoEnd}/>
            <img src="/images/output-onlinegiftools (3).gif" alt='' id="tenWordsVideo"/>
        </section>
        <section id="section3DWebsite" style={{position: 'relative'}}>
            <video muted className="video-full" loop ref={video3DWebsiteRef} onTimeUpdate={(e) => {onVideo3DPlay(e)}}>
                <source src="/video/3D Website.mp4" type="video/mp4" />
            </video>
            <div className={show3DVideoDescription ? "text-wrapper text-wrapper-appear" : "text-wrapper"}>
                <span>3D WEBSITE</span><br />
                <span>IN THESE MODERN TIMES</span><br />
                <span>WHEN A GOOD WEBSITE IS MANDATORY</span><br />
                <span>FOR A SUCCESSFUL BUSINESS, A CLASSIC SITE IS NOT ENOUGH ANYMORE</span><br />
                <span>TO ACHIEVE THE WOW EFFECT. IF YOU WANT TO INSTANTLY DIFFERENTIATE YOUR COMPANY FROM THE</span><br />
                <span>COMPETITION AND ATTRACT CUSTOMERS WITH INNOVATIVE</span><br />
                <span>AND MODERN SOLUTIONS, THEN A 3D SITE IS A SUITABLE OPTION.</span>
            </div>
        </section>
        <section id="section3DVideo" className="relative">
            <video autoPlay muted loop className="video-full-section3DVideo" ref={video3DRef}>
                <source src="/video/Solver_reel.mp4" type="video/mp4" />
            </video>
            <div className={showTextAnimate3DVideo ? "section-text-wrapper-absolute section-text-wrapper-absolute-animate section-text-animation" : "section-text-wrapper-absolute section-text-wrapper-absolute-animate"}>
                <div className="title">
                    <span>3D videos</span>
                </div>
                <div className="description">
                    <span>Adding 3D Visualisation improves conversions by 94%, on average.</span><br />
                    <span>44% of shoppers are more likely to add an item to cart after interacting with 3D,</span><br />
                    <span>60% of shoppers are more likely to buy a product after trying it out in 3D or Augmented Reality.</span><br />
                    <span>Want to show your products in 3D dimensions so that people can see them much better</span><br />
                    <span>than in a picture and thus increase their demand? Just tell us what, and we'll turn it into 3D.</span>
                </div>
            </div>
        </section>
        <section id="section3DModels" style={{
            background: `url('images/CanvasBackground.png')`,
            backgroundSize: '100% 100%',
            position: 'relative'
        }}>
            <button className="btn-move-to-room" onClick={() => {scrollToRoom()}}>
                {'Move to room >'}
            </button>
            <Model3D modelRotate={modelRotate}/>
            <div className={showTextAnimate3DModel ? "title section-text-wrapper-absolute-animate section-text-animation" : "title section-text-wrapper-absolute-animate"} style={{
                position: 'absolute',
                top: 30,
                left:' 50%',
                transform: 'translateX(-50%)'
            }}>
                <span>3D models</span>
            </div>
            <div className={showTextAnimate3DModel ? "description section-text-wrapper-absolute-animate section-text-animation" : "description section-text-wrapper-absolute-animate"} style={{
                position: 'absolute',
                bottom: 30,
                left:' 50%',
                width: 'calc(100% - 60px)',
                transform: 'translateX(-50%)'
            }}>
                <span>The best way to sell a product is to present it in a 3D model. According to the data, you have a 7,7x better chance to sell the item if you provide a 3D model.</span><br />
                <span>This method is much more interesting, different and psychologically compelling.</span>
            </div>
        </section>
        <section id="sectionImages" style={{
            background: `url('images/CanvasBackground.png')`,
            backgroundSize: '100% 100%',
            position: 'relative'
        }}>
            <div className={showTextAnimate3DImage ? "title section-text-wrapper-absolute-animate section-text-animation" : "title section-text-wrapper-absolute-animate"} style={{
                position: 'absolute',
                top: 30,
                left:' 50%',
                transform: 'translateX(-50%)'
            }}>
                <span style={{fontSize: 50, whiteSpace: 'nowrap'}}>The benefits of 3D view</span>
            </div>
            <div className="section3DModels-container">
                <div className="w-40 section-text-wrapper relative">
                    <div className={showTextAnimate3DImage ? "description section-text-wrapper-absolute-animate section-text-animation" : "description section-text-wrapper-absolute-animate"} style={{
                        position: 'absolute',
                        bottom: 30,
                        left:' 50%',
                        width: 'calc(100% - 60px)',
                        transform: 'translateX(-50%)'
                    }}>
                        <span>Improved visualization for the finished building or product
                        The ability to check for errors that may have occurred during the design and drawing process
                        The optimum use of building or creation materials
                        Lowering costs of the finished project
                        Virtual tours and walkthroughs
                        Super efficient promotional and marketing tools for the finished product
                        Minimize the number of errors and revisions needed in the design</span>
                    </div>
                </div>
                <div className="w-60 relative">
                    <ImageCarousel ref={imagesRef}/>
                    <div className="button-room-container">
                        <button onClick={() => {imagesRef.current.onClickLeft()}}>
                            Left
                        </button>
                        <button onClick={() => {imagesRef.current.onClickRight()}}>
                            Right
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <section id="sectionBookACall" style={{
            background: `url('images/CanvasBackground.png')`,
            backgroundSize: '100% 100%',
            position: 'relative'
        }}>
            <div className={showTextAnimateBook ? "description section-text-wrapper-absolute-animate section-text-animation" : "description section-text-wrapper-absolute-animate"}
                style={{
                    padding: 30,
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    fontSize: 30,
                    lineHeight: '100%'
                }}
            >
                <span style={textStyle}>
                    Whatever 3D content you need, our team is here to make it happen;
                </span><br />
                <span style={{
                    fontSize: 'inherit',
                    lineHeight: 'inherit'
                }}>
                    with more than 7years of experience in the mentioned
                </span><br />
                <span style={textStyle}>domains will transform your wishes into a 
                    3-Dimensional product
                </span><br />
                <span style={textStyle}>that will raise your
                </span><br />
                <span style={textStyle}>
                    online presence to a higher level and improve your business
                </span>
                <button className="btn-book-a-call">
                    Book a call!
                </button>
            </div>
        </section>
    </>
    )
}
export default Fix