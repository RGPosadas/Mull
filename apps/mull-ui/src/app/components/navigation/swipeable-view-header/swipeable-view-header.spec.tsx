import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import renderer from 'react-test-renderer';
import SwipeableViewHeader from './swipeable-view-header';

describe('SwipeableViewHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SwipeableViewHeader index={0} setIndex={jest.fn()} viewTitles={['Slide1', 'Slide2']} />
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have the correct button active based the view', () => {
    const utils = render(
      <SwipeableViewHeader index={0} setIndex={jest.fn()} viewTitles={['Slide1', 'Slide2']} />
    );
    utils.getByTestId('subnavigation-slide1-button').click();
    utils.rerender(
      <SwipeableViewHeader index={1} setIndex={jest.fn()} viewTitles={['Slide1', 'Slide2']} />
    );
    const subnavHeader = utils.getByTestId('subnavigation-slide2-button');
    expect(subnavHeader.classList.contains('active'));
  });

  it('should match snapshot', () => {
    const history = createMemoryHistory();
    const tree = renderer
      .create(
        <SwipeableViewHeader index={0} setIndex={jest.fn()} viewTitles={['Slide1', 'Slide2']} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
