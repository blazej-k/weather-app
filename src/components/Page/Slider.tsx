import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss"

interface ImagesAdresses{
    original: string
}


const Slider: FC = () => {

    const [images, setImages] = useState<ImagesAdresses[]>([])

    useLayoutEffect(() => {
        const photoNumbers: number[] = []
        const imagesArr = []
        for(let i = 0; i < 5;){
            const number = Math.floor(Math.random() * 8) + 1
            if(photoNumbers.indexOf(number) === -1){
                photoNumbers.push(number)
                imagesArr.push({original: `../assets/images/slider/zdj${number}.jpg`})
                i++
            }
        }
        setImages(imagesArr)
    }, [])

    return (
        <div className="slider" data-aos="fade-up" data-aos-duration="700">
            <ImageGallery
                items={images}
                infinite={true}
                showThumbnails={false}
                autoPlay={true}
                showBullets={true}
                showFullscreenButton={false}
                showNav={false}
                showPlayButton={false}
                slideInterval={6000}
                slideDuration={350}
            />
        </div>
    );
}

export default Slider;