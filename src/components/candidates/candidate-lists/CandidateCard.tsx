interface CandidateCardProps {
  name: string;
  location: string;
  avatar: string;
  skills: string[];
  title: string;
  rate: string;
  isFeatured?: boolean;
  className?: string;
}

export default function CandidateCard({
  name,
  location,
  avatar,
  skills,
  title,
  rate,
  isFeatured = false,
  className = '',
}: CandidateCardProps) {
  return (
    <div className={`ui-card ${isFeatured ? 'featured-vacancies' : ''} ${className}`}>
      <div className="ui-card-content">
        <div className="vacancies-title-location">
          <a href="/candidates/details" className="vacancies-title h5">{name}</a>
          <div className="vacancies-location">{location}</div>
        </div>
        <div className="avatar-skills-wrap">
          <div className={ skills && skills.length > 0 ? "avatar avatar--80" : "avatar avatar--280 mt-4"}>
            <img src={avatar} alt={name} />
          </div>
          {skills && skills.length > 0 && (
            <div className="skills">
              {skills.map((skill, index) => (
                <a key={index} href="#" className="crumina-button button--grey button--xs button--bordered button--hover-primary">
                  {skill}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="ui-card-footer">
        <a href="#" className="link--uppercase-wide fs-12">{title}</a>
        <a href="#" className="link--bold fs-12">{rate}</a>
      </div>
    </div>
  );
}