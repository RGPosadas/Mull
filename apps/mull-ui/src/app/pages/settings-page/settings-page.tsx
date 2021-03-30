import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React from 'react';
import { environment } from '../../../environments/environment';
import SettingsButton from '../../components/settings-button/settings-button';
import './settings-page.scss';

/* eslint-disable-next-line */
export interface SettingsPageProps {}

export function SettingsPage(props: SettingsPageProps) {
  const logOut = () => {
    axios
      .post(`${environment.backendUrl}/api/auth/clear`, null, { withCredentials: true })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div className="page-container">
      <h1 className="settings-page-title">Settings</h1>
      <SettingsButton icon={faSignOutAlt} text="Log Out" onClick={logOut} />
    </div>
  );
}

export default SettingsPage;
