// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.
import { API_HOSTNAME } from '@mull/types';

export const environment = {
  production: false,
  backendUrl: 'http://' + API_HOSTNAME + ':3333',
  backendWsUrl: 'ws://' + API_HOSTNAME + ':3333',
};
