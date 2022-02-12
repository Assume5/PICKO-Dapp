import React, { useEffect, useState } from 'react';

interface Props {
  videoUrl: string;
}

export const HeroVideoType: React.FC<Props> = ({ videoUrl }) => {
  const [id, setId] = useState('');
  useEffect(() => {
    const getYouTubeId = async () => {
      const youtubeId = videoUrl.split('v=')[1];
      setId(youtubeId);
    };
    getYouTubeId();
  }, [videoUrl]);
  return (
    <div className="video-frame">
      <iframe
        src={`https://www.youtube.com/embed/${id}?controls=0&showinfo=0&autoplay=1&loop=1&mute=1&playlist=${id}`}
        title="Restaurant Video"
        frameBorder="0"
        height="100%"
        width="100%"
      ></iframe>
      <div className='overlay'></div>
    </div>
  );
};
