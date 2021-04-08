import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../../mull-ui/src/constants';
import { MullButton } from '../../components';
import './not-found-page.scss';

const NotFoundPage = () => {
  return (
    <div className="page-container not-found">
      <img
        src="../../../assets/mull-icon-sad.png"
        className="sad-mull-icon"
        alt="sad mull icon"
      ></img>
      <p className="not-found-message">
        Uh oh - this page doesn't exist. <br /> Do you want to go back to the homepage?
      </p>
      <Link to={ROUTES.DISCOVER.url}>
        <MullButton>Go to Homepage</MullButton>
      </Link>
    </div>
  );
};

export default NotFoundPage;
