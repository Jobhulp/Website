import CandidateCard from './CandidateCard';

const candidates = [
  {
    name: 'Jerry Thomas',
    location: 'London, United Kingdom',
    avatar: '/img/author8.jpg',
    skills: ['Web', 'Development', 'HTML', 'WordPress'],
    title: 'Web Developer',
    rate: '$45 / Hour',
    isFeatured: true
  },
  {
    name: 'Catherine White',
    location: 'New York, USA',
    avatar: '/img/author9.jpg',
    skills: ['UX', 'UI', 'Web Design'],
    title: 'UX/UI Designer',
    rate: '$60 / Hour'
  },
  {
    name: 'Betty Stevens',
    location: 'Melbourne, Australia',
    avatar: '/img/author10.jpg',
    skills: ['Web', 'Web Design', 'UX', 'User Interfaces'],
    title: 'Web Designer',
    rate: '$45 / Hour',
    isFeatured: true
  },
  {
    name: 'Russell Wright',
    location: 'California, USA',
    avatar: '/img/author11.jpg',
    skills: ['Analysis', 'Finance', 'Sales', 'Marketing'],
    title: 'Marketing Director',
    rate: '$35 / Hour'
  },
  {
    name: 'Doris Stewart',
    location: 'Cologne, Germany',
    avatar: '/img/author12.jpg',
    skills: ['Web', 'Development', 'HTML', 'WordPress'],
    title: 'Web Developer',
    rate: '$60 / Hour'
  },
  {
    name: 'Maria Bowman',
    location: 'New York, USA',
    avatar: '/img/author13.jpg',
    skills: ['UX', 'UI', 'Web Design'],
    title: 'UX/UI Designer',
    rate: '$60 / Hour'
  }
];

export default function CandidateList() {
  return (
    <>
      <h3 className="mb40 mt-0">Search Result:</h3>
      {candidates.map((candidate, index) => (
        <CandidateCard
          key={index}
          {...candidate}
        />
      ))}
    </>
  );
}