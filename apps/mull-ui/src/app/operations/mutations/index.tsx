import updateLogin from './updateLogin';
import { isLoggedIn } from '../../../cache';

export const loginMutations = {
  updateLogin: updateLogin(isLoggedIn),
};
