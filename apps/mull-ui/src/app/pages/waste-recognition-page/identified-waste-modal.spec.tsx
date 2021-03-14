import { render } from '@testing-library/react';
import { dummyDetectionResults } from 'apps/mull-ui/src/mockdata';
import React from 'react';
import IdentifiedWasteModal from './identified-waste-modal';

describe('IdentifiedWasteModal', () => {
  const renderHelper = () => {
    return (
      <IdentifiedWasteModal
        detectionResult={dummyDetectionResults[0]}
        imageSrc="image"
        open={true}
        setOpen={() => {}}
      />
    );
  };
  it('should render successfully', async () => {
    const { baseElement } = render(renderHelper());

    expect(baseElement).toBeTruthy();
  });
});
