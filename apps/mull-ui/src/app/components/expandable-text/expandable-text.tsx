import React, { useState } from 'react';

import './expandable-text.scss';

export interface ExpandableTextProps {
  children: string;
  cutoff?: number;
  className?: string;
}

export const ExpandableText = ({ children, cutoff = 150, className = '' }: ExpandableTextProps) => {
  const [expand, setExpand] = useState(false);

  const getText = () => {
    if (expand) {
      return children;
    } else {
      return children.substr(0, cutoff);
    }
  };

  return (
    <div className={className} data-testid="expandable-text-div">
      {getText()}
      {children.length > cutoff && (
        <>
          {expand ? ' ' : '... '}
          <button
            data-testid="expandable-text-button"
            className="expandable-span-button"
            onClick={() => setExpand(!expand)}
          >
            {expand ? 'less' : 'more'}
          </button>
        </>
      )}
    </div>
  );
};

export default ExpandableText;