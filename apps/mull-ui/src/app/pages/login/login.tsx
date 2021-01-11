import { gql, useMutation } from '@apollo/client';
import { faFacebookSquare, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ILoginForm } from '@mull/types';
import { useFormik } from 'formik';
import { History } from 'history';
import jwtDecode from 'jwt-decode';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import logo from '../../../assets/mull-logo.png';
import { ROUTES } from '../../../constants';
import { environment } from '../../../environments/environment';
import { CustomTextInput } from '../../components';
import UserContext from '../../context/user.context';
import { useToast } from '../../hooks/useToast';
import './login.scss';

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
    }
  }
`;

export interface LoginProps {
  history: History;
}

export const Login = ({ history }: LoginProps) => {
  const [login] = useMutation(LOGIN);
  const { setUserId, setAccessToken } = useContext(UserContext);
  const { notifyToast, updateToast } = useToast();

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

    onSubmit: async (loginInput) => {
      notifyToast('Logging in...');

      try {
        var { data, errors } = await login({ variables: { loginInput } });
      } catch (err) {
        updateToast(toast.TYPE.ERROR, err.message);
        return;
      }

      if (errors) {
        console.error(errors);
        return;
      }

      const accessToken = data.login.accessToken;
      setAccessToken(accessToken);

      try {
        var decodedToken = jwtDecode(accessToken) as { id: number };
      } catch (err) {
        console.error(err);
        updateToast(toast.TYPE.ERROR, `Received an invalid token`);
        return;
      }

      setUserId(decodedToken.id);
      history.push(ROUTES.DISCOVER);

      updateToast(toast.TYPE.SUCCESS, 'Login Successful');
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
