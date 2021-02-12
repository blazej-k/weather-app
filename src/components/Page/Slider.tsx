import React, { FC } from 'react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss"


const Slider: FC = () => {

    const images = [
        {
            original: '../assets/images/slider/zdj1.jpg'
        },
        {
            original: '../assets/images/slider/zdj2.jpg'
        },
        {
            original: '../assets/images/slider/zdj3.jpg'
        },
        {
            original: '../assets/images/slider/zdj4.jpg'
        },
        {
            original: '../assets/images/slider/zdj5.jpg'
        },
        {
            original: '../assets/images/slider/zdj6.jpg'
        },
        {
            original: '../assets/images/slider/zdj7.jpg'
        },
        {
            original: '../assets/images/slider/zdj8.jpg'
        }
    ]

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