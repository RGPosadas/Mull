import { ILoginForm } from '@mull/types';
import { History } from 'history';
import jwtDecode from 'jwt-decode';
import { toast, TypeOptions } from 'react-toastify';
import { ROUTES } from './constants';

/**
 * Converts date to a list of tokens for displaying
 *
 * @param date the date to convert
 */
export const formatDate = (
  date: Date
): { year: number; month: string; day: number; time: string } => {
  const month = Intl.DateTimeFormat('en-us', {
    month: 'short',
  }).format(date);
  const timeString = Intl.DateTimeFormat('en-us', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  return { year: date.getFullYear(), month, day: date.getDate(), time: timeString };
};

/**
 * Utility method for logging in the user. Used in the login page and registration page
 *
 * @param login the login mutation
 * @param loginInput the login input containing the variables for the mutation
 * @param updateToast
 * @param setAccessToken
 * @param setUserId
 * @param history
 *
 * @see RegisterPage
 * @see LoginPage
 */
export const loginUser = async (
  login,
  loginInput: ILoginForm,
  updateToast: (type: TypeOptions, message: string) => void,
  setAccessToken: React.Dispatch<React.SetStateAction<string>>,
  setUserId: React.Dispatch<React.SetStateAction<number>>,
  history: History
) => {
  try {
    var { data, errors } = await login({ variables: { loginInput } });
  } catch (err) {
    updateToast(toast.TYPE.ERROR, err.message);
    return;
  }

  if (errors) {
    const messages = errors.map((err) => err.message).reduce((err1, err2) => err1 + err2);
    updateToast(toast.TYPE.ERROR, `Error during login: ${messages}`);
    return;
  }

  const accessToken = data.login.accessToken;
  setAccessToken(accessToken);

  const decodedToken = jwtDecode(accessToken) as { id: number };
  setUserId(decodedToken.id);

  history.push(ROUTES.DISCOVER);
};
