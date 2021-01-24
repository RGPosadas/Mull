import { IAuthToken } from '@mull/types';
import { History } from 'history';
import jwtDecode from 'jwt-decode';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTES } from '../../../constants';
import { setAccessToken } from '../../access-token';
import UserContext from '../../context/user.context';

export interface TokenRedirectPageProps {
  history: History;
}

const TokenRedirectPage = ({ history }: TokenRedirectPageProps) => {
  const { setUserId } = useContext(UserContext);
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    try {
      const decodedToken: IAuthToken = jwtDecode(token);
      setAccessToken(token);
      setUserId(decodedToken.id);
      toast('Successfully Logged In', { type: toast.TYPE.SUCCESS });
      history.push(ROUTES.HOME);
    } catch (err) {
      toast('Invalid Login Token', { type: toast.TYPE.ERROR });
      history.push(ROUTES.LOGIN);
    }
  });

  return (
    <div className="page-container">
      <p>Redirecting to home...</p>
    </div>
  );
};

export default TokenRedirectPage;
