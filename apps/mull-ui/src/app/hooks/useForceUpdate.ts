import { useState } from 'react';

export const useForceUpdate = () => {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
};
