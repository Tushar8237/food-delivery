import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./Carousel.scss"
import { getCarouselImg } from '../../../../utils/carouselImg'

export default function CarouselPage() {
  const images = getCarouselImg()
  return (
    <div className="restroDetails_imgSlider">
        <Carousel
            showArrows={true}
            swipeable={true}
            autoPlay={true}
            infiniteLoop={true}
            interval={3000}
          >
            {images.map((img) => (
              <div className="restroDetails_imgs" key={img.id}>
                <img src={img.imgUrl} alt="img name" />
              </div>
            ))}
          </Carousel>
      
    </div>
  )
}
