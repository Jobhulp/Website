import { TestimonialData } from './types';
import author6 from '@/assets/img/author6.jpg';

export const testimonials: TestimonialData[] = [
  {
    id: 1,
    quote: "Eindelijk een platform dat begrijpt dat recruitment meer is dan CV's matchen. De matchscore geeft ons direct inzicht in hoe goed iemand past bij ons team.",
    author: {
      name: "Sarah Janssens",
      role: "HR Manager bij TechCo",
      image: author6
    }
  },
  {
    id: 2,
    quote: "Geen eindeloos solliciteren meer. Ik kreeg alleen jobs te zien die echt bij mij pasten. Binnen 3 weken had ik mijn droomjob gevonden.",
    author: {
      name: "Thomas De Smedt",
      role: "Software Developer",
      image: author6
    }
  },
  {
    id: 3,
    quote: "De transparantie is fantastisch. Je ziet precies waarom je matcht en wat je eventueel mist. Dat helpt enorm bij je carriereplanning.",
    author: {
      name: "Lisa Peeters",
      role: "Marketing Specialist",
      image: author6
    }
  },
  {
    id: 4,
    quote: "Als werkgever bespaar ik nu uren aan screening. Jobhulp stuurt alleen kandidaten door die echt passen bij wat we zoeken.",
    author: {
      name: "Marc Willems",
      role: "CEO StartupHub",
      image: author6
    }
  },
  {
    id: 5,
    quote: "Het mutual match systeem zorgt ervoor dat je alleen gesprekken hebt met bedrijven die ook echt geinteresseerd zijn. Geen tijdverlies meer.",
    author: {
      name: "Emma Van den Berg",
      role: "UX Designer",
      image: author6
    }
  }
];
