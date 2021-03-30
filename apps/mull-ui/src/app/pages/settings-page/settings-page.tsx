import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'apps/mull-ui/src/environments/environment';
import axios from 'axios';
import React from 'react';
import SettingsButton from '../../components/settings-button/settings-button';
import './settings-page.scss';

/* eslint-disable-next-line */
export interface SettingsPageProps {}

export function SettingsPage(props: SettingsPageProps) {
  const logOut = () => {
    axios
      .post(`${environment.backendUrl}/api/auth/clear`, null, { withCredentials: true })
      .then(() => {
        location.reload();
      });
  };

  return (
    <div className="page-container">
      <h1 className="settings-page-title">Settings</h1>
      <SettingsButton icon={faSignOutAlt} settingName="Log Out" onClick={logOut} />
    </div>
  );
}

export default SettingsPage;
