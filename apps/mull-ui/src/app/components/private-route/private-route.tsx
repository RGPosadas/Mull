import React, { ReactNode, useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import UserContext from '../../context/user.context';

export interface PrivateRouteProps extends RouteProps {
  children?: ReactNode;
}

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  const { userId } = useContext(UserContext);
  return <Route {...rest} render={() => (userId ? children : <Redirect to={ROUTES.LOGIN} />)} />;
};

export default PrivateRoute;
