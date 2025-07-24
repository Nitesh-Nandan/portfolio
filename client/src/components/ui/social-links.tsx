import { Linkedin, Github, Twitter, Mail } from 'lucide-react';

interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  email?: string;
}

interface SocialLinksProps {
  links: SocialLinks;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const socialIcons = {
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  email: Mail,
};

const socialStyles = {
  linkedin: 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700',
  github: 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900',
  twitter: 'bg-sky-50 text-sky-600 hover:bg-sky-100 hover:text-sky-700',
  email: 'bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700',
};

const sizeClasses = {
  sm: 'p-2 h-8 w-8',
  md: 'p-3 h-10 w-10',
  lg: 'p-4 h-12 w-12',
};

const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export function SocialLinks({ links, className = '', size = 'md' }: SocialLinksProps) {
  const availableLinks = Object.entries(links).filter(([_, url]) => url);

  if (availableLinks.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {availableLinks.map(([platform, url]) => {
        const IconComponent = socialIcons[platform as keyof typeof socialIcons];
        const styleClass = socialStyles[platform as keyof typeof socialStyles];
        
        if (!IconComponent || !url) return null;

        const isEmail = platform === 'email';
        const href = isEmail ? `mailto:${url}` : url;

        return (
          <a
            key={platform}
            href={href}
            target={isEmail ? undefined : '_blank'}
            rel={isEmail ? undefined : 'noopener noreferrer'}
            className={`rounded-full ${styleClass} transition-all duration-200 group ${sizeClasses[size]}`}
            title={platform.charAt(0).toUpperCase() + platform.slice(1)}
          >
            <IconComponent className={`${iconSizes[size]} group-hover:scale-110 transition-transform duration-200`} />
          </a>
        );
      })}
    </div>
  );
} 