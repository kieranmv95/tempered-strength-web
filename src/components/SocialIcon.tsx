import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faYoutube,
  faThreads,
} from '@fortawesome/free-brands-svg-icons';

import type { SocialPlatforms } from '@/types/SocialPlatforms';

type SocialIconProps = {
  platform: SocialPlatforms;
  link?: string;
};

export const SocialIcon = ({ platform, link }: SocialIconProps) => {
  const getPlatformIcon = () => {
    switch (platform) {
      case 'instagram':
        return faInstagram;
      case 'threads':
        return faThreads;
      case 'youtube':
        return faYoutube;
      default:
        return null;
    }
  };

  const platformIcon = getPlatformIcon();

  if (!platformIcon) return null;

  if (link) {
    return (
      <a href={link}>
        <FontAwesomeIcon className="w-8 h-8" icon={platformIcon} />
      </a>
    );
  }

  return <FontAwesomeIcon className="w-8 h-8" icon={platformIcon} />;
};
