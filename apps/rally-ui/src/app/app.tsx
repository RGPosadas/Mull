import React, { useEffect, useState } from 'react';

import './app.scss';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Route, Link } from 'react-router-dom';
import { environment } from '../environments/environment';

export const App = () => {
  let [apiMessage, setApiMessage] = useState('');
  let [messageClasses, setMessageClasses] = useState('message empty');

  useEffect(() => {
    apiMessage = '';

    fetch(environment.backendUrl)
      .then((r) => r.json())
      .then((data) => {
        setApiMessage(data.message);
        console.log(data.message);
        setMessageClasses('message full');
      });
  }, []);

  return (
    <div className="main-content">
      <h1 className="card">Welcome to rally-ui!</h1>
      <h1>
        Is this a production build? {environment.production ? 'Yes' : 'No'}!{' '}
      </h1>
      <h1 className="card">Below, a message from the backend should appear!</h1>
      <div className={messageClasses}>{apiMessage}</div>
    </div>
  );
};

export default App;
