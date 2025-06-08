export interface TestimonialData {
  id: number;
  quote: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
}