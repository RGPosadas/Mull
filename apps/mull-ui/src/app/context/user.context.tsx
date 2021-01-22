import React from 'react';

const UserContext = React.createContext<{
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
}>(null);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export default UserContext;
