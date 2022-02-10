import React from 'react';
import { Social } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

interface Props {
  social: Social;
}
export const SocialMedia: React.FC<Props> = ({ social }) => {
  return (
    <div className="social-media">
      {social.facebook && (
        <div className="social-icon">
          <a href={social.facebook}>
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faFacebookSquare} size="1x" />
          </a>
        </div>
      )}
      {social.instagram && (
        <div className="social-icon">
          <a href={social.instagram}>
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faInstagram} />
          </a>
        </div>
      )}
      {social.twitter && (
        <div className="social-icon">
          <a href={social.twitter}>
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faTwitter}/>
          </a>
        </div>
      )}
    </div>
  );
};
