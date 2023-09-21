import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselCaption,
} from 'reactstrap';
import styles from "../../styles/HomePage.module.css";

const items = [
  {
    src: '/images/rock-paper-scissor.jpg',
    altText: 'Your happiness is here',
    caption: 'Don\'t let it go!',
    key: 1,
  },
  {
    src: '/images/coin.jpg',
    altText: 'Your happiness is here',
    caption: 'Don\'t let it go!',
    key: 2,
  },
  {
    src: '/images/dadu.jpg',
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
        <div className={styles.carouselImage}>
          <img src={item.src} alt={item.altText} className={styles.carouselImage} />
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
