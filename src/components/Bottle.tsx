import { CSSProperties } from 'react';

interface BottleProps {
  className?: string;
  color?: 'black' | 'white';
  style?: CSSProperties;
}

const IMAGE_MAP: Record<'black' | 'white', string> = {
  white: '/images/%D9%84%D9%82%D8%B7%D8%A9_%D8%B4%D8%A7%D8%B4%D8%A9_2026-07-18_205359%20copy.png',
  black: '/images/%D9%84%D9%82%D8%B7%D8%A9_%D8%B4%D8%A7%D8%B4%D8%A9_2026-07-18_205405%20copy.png',
};

export function Bottle({ className = '', color = 'black', style }: BottleProps) {
  return (
    <img
      src={IMAGE_MAP[color]}
      alt={`AURA ${color} bottle`}
      className={className}
      style={{ mixBlendMode: 'lighten', ...style }}
    />
  );
}
