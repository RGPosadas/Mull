import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ChatPagesHeader from './chat-pages-header';

describe('ChatPagesHeader', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(
      <MockedProvider>
        <Router history={history}>
          <ChatPagesHeader>
            <div className="page-container with-sub-nav-and-header with-bottom-chat-input"></div>
          </ChatPagesHeader>
        </Router>
      </MockedProvider>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const history = createMemoryHistory();
    const tree = renderer
      .create(
        <MockedProvider>
          <Router history={history}>
            <ChatPagesHeader>
              <div className="page-container with-sub-nav-and-header with-bottom-chat-input"></div>
            </ChatPagesHeader>
          </Router>
        </MockedProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
