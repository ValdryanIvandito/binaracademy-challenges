import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselCaption,
} from 'reactstrap';
import Image1 from "../../assets/images/rock-paper-scissor.jpg";
import coinHeadsImg from '../../assets/images/coin.jpg'
import dadu from '../../assets/images/dadu.jpg';
import "../../styles/HomePage.css";


const items = [
  {
    src: Image1,
    altText: 'Your happiness is here',
    caption: 'Don\'t let it go!',
    key: 1,
  },
  {
    src: coinHeadsImg,
    altText: 'Your happiness is here',
    caption: 'Don\'t let it go!',
    key: 2,
  },
  {
    src: dadu,
    altText: 'Your happiness is here',
    caption: 'Don\'t let it go!',
    key: 3,
  },
  // Rest of the items...
];

function Carouselcom(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div className="carousel-image-container">
          <img src={item.src} alt={item.altText} className="carousel-image" />
        </div>
        <CarouselCaption
          captionText={item.altText}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
    >
      
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default Carouselcom;
