import React from 'react';
import { render } from '@testing-library/react';

<<<<<<< HEAD
import PillOptions from './pill-options';

describe('RestrictionOptions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PillOptions options={['test']} />);
=======
import RestrictionOptions from './restriction-options';

describe('RestrictionOptions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RestrictionOptions />);
>>>>>>> 9e37f4d... added pill options #27
    expect(baseElement).toBeTruthy();
  });
});
