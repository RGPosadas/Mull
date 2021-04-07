import { IRegisterForm, LIMITS } from '@mull/types';
import { useFormik } from 'formik';
import { History } from 'history';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import logo from '../../../assets/mull-logo.png';
import { ROUTES } from '../../../constants';
import { RegistrationMethod, useCreateUserMutation } from '../../../generated/graphql';
import { hasEmoji } from '../../../utilities';
import { CustomTextInput } from '../../components';
import { useToast } from '../../hooks/useToast';
import './register.scss';

export interface RegisterProps {
  history: History;
}

const Register = ({ history }: RegisterProps) => {
  // GraphQL mutation hook to create user
  const [createUser] = useCreateUserMutation();
  const { notifyToast, updateToast } = useToast();

  const formik = useFormik<IRegisterForm>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required.')
        .max(LIMITS.USERNAME, `Name must be ${LIMITS.USERNAME} characters or less.`)
        .test('EmojiCheck', 'Emojis are not allowed in Name.', function (name) {
          return !hasEmoji(name);
        }),
      email: Yup.string().required('Email is required.').email('Email format is incorrect'),
      password: Yup.string().required('Password is required.'),
    }),

    onSubmit: async (values) => {
      notifyToast('Registering new user...');
      const user = {
        ...values,
        joinDate: new Date(),
        registrationMethod: RegistrationMethod.Local,
      };

      try {
        var { errors } = await createUser({ variables: { user } });
      } catch (err) {
        updateToast(err.message, toast.TYPE.ERROR);
        return;
      }

      if (errors) {
        const messages = errors.map((err) => err.message).reduce((err1, err2) => `${err1} ${err2}`);
        updateToast(`Error, user not created: ${messages}`, toast.TYPE.ERROR);
        return;
      }

      updateToast(
        'Account created successfully. Please login with your new credentials.',
        toast.TYPE.SUCCESS
      );
      history.push(ROUTES.LOGIN);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="page-container no-navigation register-container">
        <img src={logo} className="register-mull-logo" alt="Mull logo" />
        <CustomTextInput
          title="Name"
          fieldName="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          hasErrors={formik.touched.email && !!formik.errors.email}
          errorMessage={formik.errors.name}
        />
        <CustomTextInput
          title="Email"
          fieldName="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          hasErrors={formik.touched.email && !!formik.errors.email}
          errorMessage={formik.errors.email}
          type="email"
        />
        <CustomTextInput
          title="Password"
          fieldName="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          hasErrors={formik.touched.email && !!formik.errors.password}
          errorMessage={formik.errors.password}
          type="password"
        />
        <button type="submit" className="register-button">
          Create Account
        </button>

        <div className="login-link">
          Already have an acccount?{'  '}
          <Link to="/login" className="login-here">
            Login here!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
