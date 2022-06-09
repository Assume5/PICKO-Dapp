import React from 'react';
import { Social, StoreSocialLinks } from '@src/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

interface Props {
  social: StoreSocialLinks;
}
export const SocialMedia: React.FC<Props> = ({ social }) => {
  return (
    <div className="social-media">
      {social.facebook_url && (
        <div className="social-icon">
          <a href={social.facebook_url}>
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faFacebookSquare} size="1x" />
          </a>
        </div>
      )}
      {social.instagram_url && (
        <div className="social-icon">
          <a href={social.instagram_url}>
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faInstagram} />
          </a>
        </div>
      )}
      {social.twitter_url && (
        <div className="social-icon">
          <a href={social.twitter_url}>
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faTwitter} />
          </a>
        </div>
      )}
    </div>
  );
};
