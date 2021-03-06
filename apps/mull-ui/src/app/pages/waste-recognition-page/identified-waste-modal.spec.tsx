import { fireEvent, getByTestId, render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import IdentifiedWasteModal from './identified-waste-modal';

describe('IdentifiedWasteModal', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<IdentifiedWasteModal />);
    expect(baseElement).toBeTruthy();
  });

  it('should open modal succesfully', async () => {
    const { container } = render(<IdentifiedWasteModal />);
    const button = getByTestId(container, 'open-modal');
    fireEvent.click(button);
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<IdentifiedWasteModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
