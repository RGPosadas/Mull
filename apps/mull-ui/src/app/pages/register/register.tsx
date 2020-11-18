import React from 'react';
import { CustomTextInput } from '@mull/ui-lib';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import logo from '../../../assets/mull-logo.png';

import './register.scss';

/* eslint-disable-next-line */
export interface RegisterProps {
  history: History;
}

const Register = ({ history }: RegisterProps) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      name: Yup.string().required('Name is required.'),
      email: Yup.string().required('Email is required.').email('Email format is incorrect'),
      password: Yup.string().required('Password is required.'),
    }),

    onSubmit: (values) => {},
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="register-container">
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
        />
        <CustomTextInput
          title="Password"
          fieldName="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          hasErrors={formik.touched.email && !!formik.errors.password}
          errorMessage={formik.errors.password}
          password
        />
        <button type="submit" className="register">
          Create Account
        </button>

        <div className="login-link">
          Already have an acccount?{' '}
          <Link to="/login" className="login-here">
            {' '}
            Login here!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
