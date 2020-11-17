import React, { ReactNode, useState } from 'react';

import './expandable-text.scss';

export interface ExpandableTextProps {
  children: string;
  cutoff?: number;
  className: string;
}

export const ExpandableText = ({ children, cutoff = 150, className }: ExpandableTextProps) => {
  let [expand, setExpand] = useState(false);

  const spanText = () => {
    if (expand) {
      return children;
    } else {
      return children.substr(0, cutoff);
    }
  };

  return (
    <div className={className}>
      {spanText()}
      {children.length > cutoff && (
        <>
          {expand ? ' ' : '... '}
          <button className="expandable-span-button" onClick={() => setExpand(!expand)}>
            {expand ? 'less' : 'more'}
          </button>
        </>
      )}
    </div>
  );
};

export default ExpandableText;
