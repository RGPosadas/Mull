import { faFacebookSquare, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ILoginForm } from '@mull/types';
import { useFormik } from 'formik';
import { History } from 'history';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../../../assets/mull-logo.png';
import { environment } from '../../../environments/environment';
import { CustomTextInput } from '../../components';
import './login.scss';

export interface LoginProps {
  history: History;
}

export const Login = ({ history }: LoginProps) => {
  const handleOAuthButtonClick = (oAuthProvider: string) => {
    window.location.assign(`${environment.backendUrl}/api/auth/${oAuthProvider}`);
  };

  const formik = useFormik<ILoginForm>({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().required('Email is required.').email('Email format is incorrect'),
      password: Yup.string().required('Password is required.'),
    }),

    onSubmit: (values) => {
      // noop
    },
  });

  return (
    <div className="page-container no-navigation login-container">
      <form onSubmit={formik.handleSubmit}>
        <img src={logo} className="login-mull-logo" alt="Mull logo" />

        <CustomTextInput
          title="Email"
          fieldName="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          hasErrors={formik.touched.email && !!formik.errors.email}
          errorMessage={formik.errors.email}
        />

        <CustomTextInput
          title="Password"
          fieldName="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          hasErrors={formik.touched.password && !!formik.errors.password}
          errorMessage={formik.errors.password}
          password
        />

        <button type="submit" className="login">
          Login
        </button>
      </form>
      <div className="sign-up">
        Don't have an account?{'  '}
        <Link to="/register" className="register-login-page">
          Sign up here!
        </Link>
      </div>

      <div className="separator">or</div>

      <button
        className="twitter"
        type="button"
        onClick={() => {
          handleOAuthButtonClick('twitter');
        }}
      >
        <FontAwesomeIcon icon={faTwitter} size="2x" />
        &nbsp; Continue with Twitter
      </button>

      <button
        className="google"
        type="button"
        onClick={() => {
          handleOAuthButtonClick('google');
        }}
      >
        <FontAwesomeIcon icon={faGoogle} size="2x" />
        &nbsp; Continue with Google
      </button>

      <button
        className="facebook"
        type="button"
        onClick={() => {
          handleOAuthButtonClick('facebook');
        }}
      >
        <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
        &nbsp; Continue with Facebook
      </button>
    </div>
  );
};

export default Login;
