import React from 'react';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import postRegister from '../../redux/action/Register';
import { loader } from '../../redux/reducer/Loader';
import { Loader } from '../../components/Loader/Loader';
import { RootState } from '../../redux/store';
import Router from 'next/router';
import { AnyAction } from 'redux';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const load = useSelector((state: RootState) => state?.loader.loader);

  const intialValues: registerType = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirm_password: '',
    gender: '',
    dob: '',
    status: '1',
    role: '',
  };

  return (
    <div className="">
      <Formik
        enableReinitialize={true}
        initialValues={intialValues}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required('First Name Required'),
          lastName: Yup.string().required('Last Name Required'),
          email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
          phoneNumber: Yup.string()
            .matches(/^\d{10}$/, 'Invalid phone number')
            .required('Phone Number Required'),
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
          confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
            .required('Confirm Password is required'),
          gender: Yup.string()
            .oneOf(['male', 'female'], 'Gender must be either male or female')
            .required('Gender is required'),
          dob: Yup.string()
            
            .required('Date of birth is required'),
          role: Yup.string()
            .oneOf(['admin', 'user'], 'Role must be either admin or user')
            .required('Role is required'),
        })}
        onSubmit={(values) => {
          values.firstName = values.firstName?.trim();
          values.lastName = values.lastName?.trim();
          values.email = values.email?.trim();
          values.password = values.password?.trim();
          values.confirm_password = values.confirm_password?.trim();
          values.gender = values.gender?.trim();
          const formattedDate = new Date(values.dob).toLocaleDateString(
            'en-GB'
          );
          values.dob = formattedDate;
          values.role = values.role?.trim();
          dispatch(loader(true));
           dispatch(postRegister(values, Router) as unknown as AnyAction);
        }}
      >
        {({ values, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row w-100 m-auto">
              <div className="col-md-12">
                <h2>Create Account</h2>
                <span>or use your email for registration</span>
                <div className="row">
                  <div className="col-md-6">
                    <Field
                      className="form-control mb-2"
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="off"
                      value={values.firstName}
                      placeholder="First Name"
                      style={{
                        backgroundColor: '#eee',
                        border: 'none',
                        padding: '12px 15px',
                        margin: '8px 0',
                        width: '100%',
                      }}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="span"
                      className="error-message"
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      className="form-control mb-2"
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="off"
                      value={values.lastName}
                      placeholder="Lirst Name"
                      style={{
                        backgroundColor: '#eee',
                        border: 'none',
                        padding: '12px 15px',
                        margin: '8px 0',
                        width: '100%',
                      }}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="span"
                      className="error-message"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Field
                      className="form-control mb-2"
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={values.email}
                      placeholder="Email"
                      style={{
                        backgroundColor: '#eee',
                        border: 'none',
                        padding: '12px 15px',
                        margin: '8px 0',
                        width: '100%',
                      }}
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="error-message"
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      className="form-control mb-2"
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      autoComplete="off"
                      value={values.phoneNumber}
                      placeholder="Phone Number"
                      style={{
                        backgroundColor: '#eee',
                        border: 'none',
                        padding: '12px 15px',
                        margin: '8px 0',
                        width: '100%',
                      }}
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="span"
                      className="error-message"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Field
                      className="form-control mb-2"
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="off"
                      value={values.password}
                      placeholder="password"
                      style={{
                        backgroundColor: '#eee',
                        border: 'none',
                        padding: '12px 15px',
                        margin: '8px 0',
                        width: '100%',
                      }}
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="error-message"
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      className="form-control mb-2"
                      type="password"
                      name="confirm_password"
                      id="confirm_password"
                      autoComplete="off"
                      value={values.confirm_password}
                      placeholder="Confirm password"
                      style={{
                        backgroundColor: '#eee',
                        border: 'none',
                        padding: '12px 15px',
                        margin: '8px 0',
                        width: '100%',
                      }}
                    />
                    <ErrorMessage
                      name="confirm_password"
                      component="span"
                      className="error-message"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Field
                      className="form-control mb-2"
                      as="select"
                      id="gender"
                      name="gender"
                      value={values.gender}
                      style={{
                        backgroundColor: '#eee',
                        border: 'none',
                        padding: '12px 15px',
                        margin: '8px 0',
                        width: '100%',
                      }}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="span"
                      className="error-message"
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      className="form-control mb-2"
                      type="date"
                      id="dob"
                      name="dob"
                      placeholder="Date of Birth (DD/MM/YYYY)"
                      style={{
                        backgroundColor: '#eee',
                        border: 'none',
                        padding: '12px 15px',
                        margin: '8px 0',
                        width: '100%',
                      }}
                    />
                    <ErrorMessage
                      name="dob"
                      component="span"
                      className="error-message"
                    />
                  </div>
                </div>

                <Field
                  className="form-control mb-2"
                  as="select"
                  id="role"
                  name="role"
                  value={values.role}
                  style={{
                    backgroundColor: '#eee',
                    border: 'none',
                    padding: '12px 15px',
                    margin: '8px 0',
                    width: '100%',
                  }}
                >
                  <option value="">Select role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="span"
                  className="error-message"
                />
                <div className="row">
                  <div className="col-md-12 m-auto text-center">
                    <button className="btn btn-primary w-100" type="submit">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default SignUpForm;
