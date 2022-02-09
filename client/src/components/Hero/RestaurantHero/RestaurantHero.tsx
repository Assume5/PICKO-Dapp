import React from 'react';
import { HeroType } from '../../../types/index';
import { HeroCarouselType } from './HeroCarouselType/HeroCarouselType';
import { HeroImageType } from './HeroImageType/HeroImageType';
import { HeroVideoType } from './HeroVideoType/HeroVideoType';

interface Props {
  hero: HeroType;
}

export const RestaurantHero: React.FC<Props> = ({ hero }) => {
  if (hero) {
    return (
      <div className={`restaurant-hero ${hero && hero.type}`}>
        {hero.type === 'image' && hero.image && <HeroImageType image={hero.image} />}
        {hero.type === 'video' && hero.videoUrl && <HeroVideoType videoUrl={hero.videoUrl} />}
        {hero.type === 'carousel' && hero.images && <HeroCarouselType images={hero.images} />}
        <div className="scroll-mouse">
          <div className="scroller"></div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
