import React from 'react';
import { HeroType, Social, StoreHeroImages, StoreSocialLinks } from '@src/types';
import { HeroCarouselType } from './HeroCarouselType/HeroCarouselType';
import { HeroImageType } from './HeroImageType/HeroImageType';
import { HeroVideoType } from './HeroVideoType/HeroVideoType';
import { SocialMedia } from '../../SoicalMedia/SocialMedia';

interface Props {
  heroImages: StoreHeroImages[];
  socialData: StoreSocialLinks;
  heroType: string;
}

export const RestaurantHero: React.FC<Props> = ({ heroImages, socialData, heroType }) => {
  return (
    <>
      <div className={`restaurant-hero ${heroType}`}>
        {<SocialMedia social={socialData} />}
        {heroType === 'image' && <HeroImageType image={heroImages[0].hero_image} />}
        {/* {heroType === 'video' && hero.videoUrl && <HeroVideoType videoUrl={hero.videoUrl} />} */}
        {heroType === 'carousel' && (
          <HeroCarouselType
            images={heroImages
              .map((image) => {
                return image.hero_image;
              })
              .join(',')}
          />
        )}
        <div className="scroll-mouse">
          <div className="scroller"></div>
        </div>
      </div>
    </>
  );
};
