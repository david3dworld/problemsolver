import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const ImageCarousel = forwardRef((props, ref) => {
    const [imageIndex, setImageIndex] = useState(1)

    useImperativeHandle(ref, () => ({
        onClickLeft: () => {
            if(imageIndex > 1){
                setImageIndex(imageIndex - 1)
            }
        },
        onClickRight: () => {
            if(imageIndex < 60){
                setImageIndex(imageIndex + 1)
            }
        },
      }), [imageIndex])

    useEffect(() => {
        document.addEventListener('keyup', onKeyUp)
        return () => {
            document.removeEventListener('keyup', onKeyUp)
        }
    }, [imageIndex])

    const onKeyUp = (e) => {
        if(e.keyCode === 39 && imageIndex < 60){
            setImageIndex(imageIndex + 1)
        }
        if(e.keyCode === 37 && imageIndex > 1){
            setImageIndex(imageIndex - 1)
        }
    }
    
    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }
    return (
      <>
        {new Array(60).fill('').map((el, idx) => (
            <img key={`img-${idx}`} style={{display: imageIndex === idx + 1 ? 'block' : 'none', background: 'transparent'}} src={`/images/carousel room/Soba00${pad(idx + 1)}.png`} alt='' className="image-full-contain"/>
        ))}
      </>
    );
})
export default ImageCarousel