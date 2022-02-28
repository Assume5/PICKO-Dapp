import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
interface Props {
  images: string;
}

const showSlides = (
  slides: HTMLDivElement | undefined,
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>,
  slideIndex: number,
) => {
  const slidesItem = slides?.querySelectorAll('.carousel-item');

  if (slidesItem) {
    slidesItem[slideIndex].classList.toggle('active');
    setSlideIndex(slideIndex);
  }
};

const nextSlides = (
  index: number,
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>,
  slides: HTMLDivElement | undefined,
) => {
  const slidesItem = slides?.querySelectorAll('.carousel-item');
  const length = slides?.querySelectorAll('.carousel-item').length;
  if (length && slidesItem && index !== length - 1) {
    slidesItem[index].classList.toggle('active');
    showSlides(slides, setSlideIndex, index + 1);
  } else if (slidesItem) {
    slidesItem[index].classList.toggle('active');
    showSlides(slides, setSlideIndex, 0);
  }
};

const prevSlides = (
  index: number,
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>,
  slides: HTMLDivElement | undefined,
) => {
  const slidesItem = slides?.querySelectorAll('.carousel-item');
  if (slidesItem && index !== 0) {
    slidesItem[index].classList.toggle('active');
    showSlides(slides, setSlideIndex, index - 1);
  } else if (slidesItem) {
    slidesItem[index].classList.toggle('active');
    showSlides(slides, setSlideIndex, slidesItem.length - 1);
  }
};

export const HeroCarouselType: React.FC<Props> = ({ images }) => {
  const [imagesArray, setImagesArray] = useState<string[]>([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slides, setSlides] = useState<HTMLDivElement>();
  const slider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initSlides = async () => {
      const tempArray = images.split(',');
      setImagesArray(tempArray);
      if (slider.current) {
        const tempSlides = slider.current;
        setSlides(tempSlides);
      }
    };
    initSlides();
  }, [images]);

  useEffect(() => {
    const nextButton = document.querySelector('.carousel-next');
    if (nextButton && nextButton instanceof HTMLElement) {
      setInterval(() => {
        nextButton.click();
      }, 5000);
    }
  }, []);

  return (
    <div className="carousel-container" ref={slider}>
      <div className="carousel-prev" onClick={() => prevSlides(slideIndex, setSlideIndex, slides)}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </div>

      {imagesArray.map((image, i) => {
        return (
          <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i}>
            <img src={image} alt="" />
            <div className="overlay"></div>
          </div>
        );
      })}

      <div className="carousel-next" onClick={() => nextSlides(slideIndex, setSlideIndex, slides)}>
        <FontAwesomeIcon icon={faCaretRight} />
      </div>
    </div>
  );
};
