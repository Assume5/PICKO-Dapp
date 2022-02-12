import React from 'react';

interface Props {
  image: string;
}

export const HeroImageType: React.FC<Props> = ({ image }) => {
  return (
    <>
      <div className="background-img" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="overlay"></div>
    </>
  );
};
