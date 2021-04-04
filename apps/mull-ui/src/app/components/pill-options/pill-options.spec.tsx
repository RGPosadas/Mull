import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import PillOptions from './pill-options';

const mockOptions: string[] = ['Yes', 'No', 'Maybe'];
const mockOnChange: jest.Mock = jest.fn();
describe('PillOptions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PillOptions options={mockOptions} onChange={mockOnChange} active={0} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(<PillOptions options={mockOptions} onChange={mockOnChange} active={0} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have an active option', () => {
    render(<PillOptions options={mockOptions} onChange={mockOnChange} active={0} />);
    const pill = screen.getByTestId('pill-id-0');
    expect(pill.classList.contains('pill-option-active')).toBeTruthy();
  });

  it('should have a different active option', () => {
    const { rerender } = render(
      <PillOptions options={mockOptions} onChange={mockOnChange} active={0} />
    );
    let pill = screen.getByTestId('pill-id-0');
    expect(pill).toHaveTextContent('Yes');
    pill = screen.getByTestId(`pill-id-1`);
    fireEvent.click(pill);
    expect(mockOnChange).toHaveBeenCalled();
    const activePill = mockOnChange.mock.calls[0][0];
    rerender(<PillOptions options={mockOptions} onChange={mockOnChange} active={activePill} />);
    pill = screen.getByTestId(`pill-id-${activePill}`);
    expect(pill.classList.contains('pill-option-active')).toBeTruthy();
  });
});
