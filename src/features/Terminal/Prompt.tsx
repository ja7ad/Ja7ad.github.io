
import React from 'react';
import '../../styles/Agnoster.css';

type PromptProps = {
  path?: string;
};

const Prompt: React.FC<PromptProps> = ({ path = '~' }) => {
  return (
    <div className="agnoster-prompt">
      {/* Segment 1: User */}
      <div className="segment seg-user">
        javad@resume
      </div>
      
      {/* Arrow from User to Dir */}
      <div className="arrow arrow-user-dir"></div>

      {/* Segment 2: Directory */}
      <div className="segment seg-dir">
        {path}
      </div>

      {/* Finishing Arrow */}
      <div className="arrow arrow-dir-end"></div>
    </div>
  );
};

export default Prompt;
