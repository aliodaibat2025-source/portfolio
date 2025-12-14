
import { ExperienceProps } from './experience';

const ExperienceHeader = ({textInExperience}:ExperienceProps) => (
  <div className="text-center mb-16 pt-32">
    <h2 className="experience-heading text-4xl font-bold text-white mb-4">
      Experience
    </h2>
    <p className="experience-text text-gray-300 text-center text-lg max-w-2xl mx-auto">
      {textInExperience?.value}
    </p>
  </div>
);

export default ExperienceHeader;
