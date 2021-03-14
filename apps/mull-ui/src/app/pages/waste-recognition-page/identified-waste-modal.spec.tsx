import { render } from '@testing-library/react';
import React from 'react';
import { dummyDetectionResults } from '../../../mockdata';
import IdentifiedWasteModal from './identified-waste-modal';

describe('IdentifiedWasteModal', () => {
  const renderHelper = () => {
    return (
      <IdentifiedWasteModal
        detectionResult={dummyDetectionResults[0]}
        imageSrc="image"
        open={true}
        setOpen={() => {
          // noop
        }}
      />
    );
  };
  it('should render successfully', async () => {
    const { baseElement } = render(renderHelper());

    expect(baseElement).toBeTruthy();
  });
});
