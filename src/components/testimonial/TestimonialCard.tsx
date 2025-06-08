import React from 'react';
import { TestimonialData } from './types';

interface TestimonialCardProps {
  testimonial: TestimonialData;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <blockquote className="quote--squared">
      <p>
        <i className="puzzle-icon quote fas fa-quote-left"></i>
        {testimonial.quote}
      </p>

      <div className="quote-footer">
        <div className="author-block">
          <div className="avatar avatar--70">
            <img src={testimonial.author.image} alt={testimonial.author.name} />
          </div>
          <div className="author-content">
            <h6 className="author-name">{testimonial.author.name}</h6>
            <div className="author-prof">{testimonial.author.role}</div>
          </div>
        </div>
      </div>
    </blockquote>
  );
};

export default TestimonialCard;