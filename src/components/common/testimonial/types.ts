import type { StaticImageData } from 'next/image';

export interface TestimonialData {
  id: number;
  quote: string;
  author: {
    name: string;
    role: string;
    image: string | StaticImageData;
  };
}