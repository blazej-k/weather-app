import React, { FC, memo, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss"

interface ImagesAdresses {
    original: string,
    originalAlt: 'slider-image'
}

let images: ImagesAdresses[]
const getSlides = async () => {
    const photoNumbers: number[] = []
    const imagesArr: ImagesAdresses[] = []
    for (let i = 0; i < 5;) {
        const number = Math.floor(Math.random() * 8) + 1
        if (photoNumbers.indexOf(number) === -1) {
            photoNumbers.push(number)
            await import(`../../assets/images/slider/img${number}.jpg`)
                .then(res => imagesArr.push({ original: res.default, originalAlt: 'slider-image' }))
                .then(() => i++)
        }
    }
    return imagesArr
}
getSlides().then(res => images = res)

const Slider: FC = () => {

    const [showSlider, setShowSlider] = useState(false)

    return (
        <>
            <div className="slider-wrapper">
                {!showSlider && <div className="loader delay"></div>}
                <div style={{ opacity: showSlider ? 1 : 0 }} className='slider'>
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
                        lazyLoad={true}
                        onImageLoad={() => setShowSlider(true)}
                    />
                </div>
            </div>
        </>
    );
}

export default memo(Slider);