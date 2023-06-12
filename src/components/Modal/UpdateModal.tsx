import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { format, parse } from 'date-fns';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { RootState } from 'redux/store';
import { url } from 'API/ApiUrl';
import axios from 'axios';
import showToaster from 'components/Toaster/Toaster';
import {
  errorMessage,
  errorr,
  success,
} from 'components/Toaster/ToasterMassage';

const UpdateModal = (props: modalType) => {
  const [userData, setUserData] = useState<any | null>(null);
  const token = useSelector(
    (state: RootState) => state?.login?.loginData?.authorization
  );
  const UserID = props.UserID;
  useEffect(() => {
    fetchUserData(UserID, token);
  }, [UserID, token]);

  const fetchUserData = async (UserID: string, token: string) => {
    await axios
      .get(`${url}getUsersList`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const user = res.data.data.find((user: any) => user._id === UserID);
        setUserData(user);
      })
      .catch(() => {
        showToaster(errorr, errorMessage);

        console.warn('Something Went Wrong');
      });
  };

  const intialValues: userUpadteType = {
    _id: "",
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    phoneNumber: userData?.phoneNumber || '',
    password: '',
    confirm_password: '',
    gender: userData?.gender || '',
    dob: userData
      ? format(parse(userData.dob, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd')
      : '',
    role: userData?.role,
    status: userData?.status,
    UserID: ''
  };

  return (
    <>
      <Modal
        show={props.show}
        //  onClick={props.onClose as MouseEventHandler<HTMLDivElement>}
        onHide={props.onClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Update User</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <div className="">
            {userData && (
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
                    .oneOf(
                      [Yup.ref('password'), undefined],
                      'Passwords must match'
                    )
                    .required('Confirm Password is required'),
                  gender: Yup.string()
                    .oneOf(
                      ['male', 'female'],
                      'Gender must be either male or female'
                    )
                    .required('Gender is required'),
                  dob: Yup.date()
                    .max(new Date(), 'Date of birth cannot be in the future')
                    .required('Date of birth is required'),
                })}
                onSubmit={(values) => {
                   values._id = UserID;
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
                  values.role = values.role;
                  values.status = values.status;
                  try {
                    axios.post(`${url}saveUserInfo`, values, {
                      headers: {
                        Authorization: token,
                      },
                    });

                    showToaster(success, 'User status updated successfully');
                    props.onClose();
                    fetchUserData("","")
                  } catch (error) {
                    showToaster(errorr, 'Failed to update user status');
                    console.error('Something went wrong:', error);
                  }
                }}
              >
                {({ values, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="row w-100 m-auto">
                      <div className="col-md-12">
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

                        {/* <Field
                  className="form-control mb-2"
                  as="select"
                  id="role"
                  name="role"
                  value={values.role}
                  style={{
                    backgroundColor: "#eee",
                    border: "none",
                    padding: "12px 15px",
                    margin: "8px 0",
                    width: "100%",
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
                /> */}
                        <div className="row">
                          <div className="col-md-12 m-auto text-center">
                            <button
                              className="btn btn-primary w-100"
                              type="submit"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={props.onClose}>
            Cancel
          </Button> */}
          {/* <Button variant="danger" onClick={props.onClose}>
            Delete
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UpdateModal;
