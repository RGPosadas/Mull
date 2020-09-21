import React, { useEffect, useState } from 'react';

import './app.scss';

import { environment } from '../environments/environment';
import { Message } from '@mull/types';
import { UiLib } from '@mull/ui-lib';

export const App = () => {
  const [apiMessage, setApiMessage] = useState('');
  const [messageClasses, setMessageClasses] = useState('message empty');

  useEffect(() => {
    fetch(environment.backendUrl)
      .then((r) => r.json())
      .then((data: Message) => {
        setApiMessage(data.message);
        console.log(data.message);
        setMessageClasses('message full');
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="main-content">
      <h1 className="card">Welcome to mull-ui!</h1>
      <h1>Is this a production build? {environment.production ? 'Yes' : 'No'}! </h1>
      <h1 className="card">Below, a message from the backend should appear!</h1>
      <div className={messageClasses}>{apiMessage}</div>
      <UiLib></UiLib>
    </div>
  );
};

export default App;
