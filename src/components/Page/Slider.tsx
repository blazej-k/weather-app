import React, { FC } from 'react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss"

 
const Slider: FC = () => {

    const images = [
        {
            original: '../assets/images/logo.png',
        },
        {
            original: '../assets/images/slider/zdj2.png'
        }
    ]

    return (
        <ImageGallery 
            items={images} 
            infinite={true} 
            showThumbnails={false} 
            autoPlay={true}
            showBullets={true}
            showFullscreenButton={false}
            showNav={false}
            showPlayButton={false}
            slideInterval={3000}
            slideDuration={350}
        />
    );
}
 
export default Slider;