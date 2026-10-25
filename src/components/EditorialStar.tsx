import React from 'react';

interface EditorialStarProps {
  className?: string;
  size?: number;
}

export const EditorialStar: React.FC<EditorialStarProps> = ({
  className = 'w-3.5 h-3.5',
  size,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`inline-block shrink-0 select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      <path d="M12 0C12 7.5 16.5 12 24 12C16.5 12 12 16.5 12 24C12 16.5 7.5 12 0 12C7.5 12 12 7.5 12 0Z" />
    </svg>
  );
};
