import React, { ChangeEvent } from 'react';
import { render } from '@testing-library/react';

import CustomFileUpload, { CustomFileUploadProps } from './custom-file-upload';

const mockHandleChange: (e: ChangeEvent<HTMLInputElement>) => void = jest.fn();

const mockCustomFileUploadProps: () => CustomFileUploadProps = () => ({
  imageURL: '/assets/random.jpg',
  errorMessage: 'Text is not valid.',
  hasErrors: true,
  uploadIcon: null,
  handleFileUpload: mockHandleChange,
});

const mockCustomFileUploadNoImageProps: () => CustomFileUploadProps = () => ({
  imageURL: null,
  errorMessage: 'Text is not valid.',
  hasErrors: false,
  uploadIcon: null,
  handleFileUpload: mockHandleChange,
});

describe('CustomFileUpload', () => {
  it('should render successfully without an image', () => {
    const props = mockCustomFileUploadProps();
    const { baseElement } = render(<CustomFileUpload {...props} />);
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with an image and without errors', () => {
    const props = mockCustomFileUploadNoImageProps();
    const { baseElement } = render(<CustomFileUpload {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
