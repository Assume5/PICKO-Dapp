import React from 'react';
import { HeroType, Social } from '../../../types/index';
import { HeroCarouselType } from './HeroCarouselType/HeroCarouselType';
import { HeroImageType } from './HeroImageType/HeroImageType';
import { HeroVideoType } from './HeroVideoType/HeroVideoType';
import { SocialMedia } from '../../SoicalMedia/SocialMedia';

interface Props {
  hero: HeroType;
  social: Social;
}

export const RestaurantHero: React.FC<Props> = ({ hero, social }) => {
  if (hero) {
    return (
      <div className={`restaurant-hero ${hero && hero.type}`}>
        {social.hasSocialMedia && <SocialMedia social={social} />}
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
