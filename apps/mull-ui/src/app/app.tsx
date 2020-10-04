import React, { useEffect, useState } from 'react';

import './app.scss';

import { environment } from '../environments/environment';
import { Message } from '@mull/types';
import { UiLib } from '@mull/ui-lib';
import Navigation from './components/navigation';

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
      <Navigation />
  );
};

export default App;
