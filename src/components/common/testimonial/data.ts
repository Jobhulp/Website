import { TestimonialData } from './types';
import author1 from '@/assets/img/author1.jpg';
import author6 from '@/assets/img/author6.jpg';
import author7 from '@/assets/img/author7.jpg';
import author8 from '@/assets/img/author8.jpg';

export const testimonials: TestimonialData[] = [
  {
    id: 1,
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua in voluptate velit esse cillum.",
    author: {
      name: "Philip Demarco",
      role: "Copywriter",
      image: author6
    }
  },
  {
    id: 2,
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua in voluptate velit esse cillum.",
    author: {
      name: "Angelina Johnson",
      role: "Graphic Designer",
      image: author1
    }
  },
  {
    id: 3,
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua in voluptate velit esse cillum.",
    author: {
      name: "Peter Spenser",
      role: "Marketing Director",
      image: author7
    }
  },
  {
    id: 4,
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua in voluptate velit esse cillum.",
    author: {
      name: "John Doe",
      role: "Software Engineer",
      image: author8
    }
  },
  {
    id: 5,
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua in voluptate velit esse cillum.",
    author: {
      name: "John Doe",
      role: "Software Engineer",
      image: author8
    }
  }
];