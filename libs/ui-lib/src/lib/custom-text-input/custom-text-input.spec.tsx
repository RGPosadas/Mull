import React, { ChangeEvent } from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CustomTextInput, { CustomTextInputProps } from './custom-text-input';

const mockOnChange: (e: ChangeEvent<HTMLInputElement>) => void = jest.fn();

const mockCustomTextInputProps: () => CustomTextInputProps = () => ({
  title: 'Text',
  value: '',
  fieldName: 'text',
  errorMessage: 'Text is not valid.',
  onChange: mockOnChange,
  hasErrors: true,
  svgIcon: null,
});

describe('CustomTextInput', () => {
  it('should render successfully', () => {
    const props = mockCustomTextInputProps();
    const { baseElement } = render(<CustomTextInput {...props} />);
    expect(baseElement).toBeTruthy();
  });

  it('should have the correct text input', () => {
    const props = mockCustomTextInputProps();
    const inputText = 'Denial anger bartering depression acceptance';
    const utils = render(<CustomTextInput {...props} />);
    const input = utils.getByTestId('custom-text-input');
    fireEvent.change(input, { target: { value: inputText } });
    props.value = inputText;
    utils.rerender(<CustomTextInput {...props} />);
    expect(input.value).toBe(inputText);
  });

  it('should match snapshot', () => {
    const props = mockCustomTextInputProps();
    const tree = renderer.create(<CustomTextInput {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render successfully without errors', () => {
    const props = mockCustomTextInputProps();
    props.hasErrors = false;
    const { baseElement } = render(<CustomTextInput {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
