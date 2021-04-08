import { min } from 'lodash';
import React, { useState } from 'react';
import { exceedsNbOfLines, getIndexOfNthOccurence } from '../../../utilities';
import './expandable-text.scss';

export interface ExpandableTextProps {
  children: string;
  cutoff?: number;
  maxlines?: number;
  className?: string;
}

export const ExpandableText = ({
  children,
  cutoff = 150,
  maxlines = 6,
  className = '',
}: ExpandableTextProps) => {
  const [expand, setExpand] = useState(false);

  const getText = () => {
    if (expand) {
      return children;
    } else {
      const mincuttoff = min([cutoff, getIndexOfNthOccurence(children, '\n', maxlines)]);
      return children.substr(0, mincuttoff);
    }
  };

  const getButton = () => {
    if (children.length > cutoff || exceedsNbOfLines(children, maxlines)) {
      return (
        <>
          {expand ? ' ' : '... '}
          <button
            type="button"
            data-testid="expandable-text-button"
            className="expandable-span-button"
            onClick={() => setExpand(!expand)}
          >
            {expand ? 'less' : 'more'}
          </button>
        </>
      );
    }
  };

  return (
    <div className={`expandable-text-container ${className}`} data-testid="expandable-text-div">
      {getText()}
      {getButton()}
    </div>
  );
};

export default ExpandableText;
