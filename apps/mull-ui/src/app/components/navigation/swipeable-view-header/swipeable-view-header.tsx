import React, { CSSProperties } from 'react';

export interface SubNavBarProps {
  style?: CSSProperties;
  className?: string;
  viewTitles: string[];
  index: number;
  setIndex: (idx: number) => void;
}

export const SwipeableViewsHeader = ({
  style,
  className,
  viewTitles,
  index,
  setIndex,
}: SubNavBarProps) => {
  const views = viewTitles.map((viewTitle, idx) => {
    const testid = 'subnavigation-' + viewTitle.toLowerCase().replace(' ', '') + '-button';
    return (
      <p
        key={viewTitle}
        className={`subnavigation-link ${index === idx ? 'active' : ''}`}
        onClick={() => {
          setIndex(idx);
        }}
        data-testid={testid}
      >
        {viewTitle}
      </p>
    );
  });
  return (
    <div className={`sub-nav-bar-container ${className}`} style={style}>
      <div className="inner-cont">{views}</div>
    </div>
  );
};

export default SwipeableViewsHeader;
