import React, { useEffect, useState } from 'react';

import './app.scss';

import { environment } from '../environments/environment';
import { Message } from '@mull/types';

import NavigationBar from './components/navigation-bar/navigation-bar';

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

  return <NavigationBar />;
};

export default App;
