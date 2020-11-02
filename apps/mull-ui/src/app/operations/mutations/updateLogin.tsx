import { ReactiveVar } from '@apollo/client';

export default function updateLogin(isLoggedIn: ReactiveVar<boolean>) {
  return () => {
    const login = isLoggedIn();
    isLoggedIn(!login);
  };
}
