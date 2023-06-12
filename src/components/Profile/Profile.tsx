import React, { ChangeEvent, useEffect, useState } from 'react';
import * as Yup from 'yup';
import user from '../../../src/Images/image-gallery.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import { imageUrl, url } from 'API/ApiUrl';
import showToaster from 'components/Toaster/Toaster';
import { errorr, success } from 'components/Toaster/ToasterMassage';
import { updateProfileData } from 'redux/reducer/Profile';
import { useRouter } from 'next/router';
import { resetProfileData } from 'redux/reducer/Profile';

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const defaultImageSrc =
    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6.webp';
  const [picture, setPicture] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const token = useSelector(
    (state: RootState) => state?.login?.loginData?.authorization
  );
  const profile1 = useSelector((state: RootState) => state?.login?.loginData);
  const profile = useSelector((state: RootState) => state?.profile?.loginData);

  const imageOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e?.target.files && e?.target.files?.length > 0) {
      setLogoFile(e.target.files[0]);
      file2Base64(e.target.files[0]).then((img: string) => {
        setPicture(img);
      });
    }
  };
  const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || '');
      reader.onerror = (error) => reject(error);
    });
  };
  const RemoveLogo = () => {
    setPicture(defaultImageSrc);
    setLogoFile(null);
    dispatch(resetProfileData());
  };
  const intialValues: updateProfileType = {
    _id: profile?._id || profile1?._id || '',
    firstName: profile?.firstName || profile1?.firstName || '',
    lastName: profile?.lastName || profile1?.lastName || '',
    email: profile?.email || profile1?.email || '',
    phoneNumber: profile?.phoneNumber || profile1?.phoneNumber || '',
    password: '',
    confirm_password: '',
    gender: profile?.gender || profile1?.gender || '',
    dob: profile?.dob || profile1?.dob || '',
    role: profile?.role || profile1?.role || '',
    status: profile?.status || profile1?.status || '',
    profileImage: profile?.profileImage || profile1?.profileImage || '',
    profileOldImage: '',
  };

  return (
    <div className="container-fluid p-0">
      <Formik
        enableReinitialize={true}
        initialValues={intialValues}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required('First Name Required'),
          lastName: Yup.string().required('Last Name Required'),
          phoneNumber: Yup.string()
            .matches(/^\d{10}$/, 'Invalid phone number')
            .required('Phone Number Required'),
          password: Yup.string().min(
            8,
            'Password must be at least 8 characters'
          ),
          confirm_password: Yup.string().test(
            'passwords-match',
            'Passwords must match',
            function (value) {
              const { password } = this.parent;
              if (password) {
                return value === password;
              }
              return true;
            }
          ),
        })}
        onSubmit={async (values) => {
          const { password, confirm_password, ...modifiedValues } = values;

          if (logoFile) {
            const formData = new FormData();
            formData.append('image', logoFile);

            try {
              const uploadImageResponse = await axios.post(
                `${imageUrl}uploadImage`,
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: token,
                  },
                }
              );

              const profileImage = uploadImageResponse.data.imgPath;
              modifiedValues.profileImage = profileImage;
              modifiedValues.profileOldImage =
                profile?.profileImage || profile1?.profileImage || '';
            } catch (error) {
              showToaster(errorr, 'Failed to upload image');
              console.error('Something went wrong:', error);
              return;
            }
          }

          try {
            const saveUserInfoResponse = await axios.post(
              `${url}saveUserInfo`,
              {
                ...modifiedValues,
                ...(values.password && { password: values.password }),
                ...(values.confirm_password && {
                  confirm_password: values.confirm_password,
                }),
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            );

            if (saveUserInfoResponse.data.status === 200) {
              dispatch(updateProfileData(saveUserInfoResponse.data.data));
              showToaster(success, 'User status updated successfully');
            } else {
              showToaster(errorr, saveUserInfoResponse?.data?.message);
            }
          } catch (error) {
            showToaster(errorr, 'Failed to update user');
            console.error('Something went wrong:', error);
          }
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row h-100">
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <button
                      className="fa fa-times"
                      type="button"
                      onClick={() => RemoveLogo()}
                      style={{
                        cursor: 'pointer',
                        color: '#fff',
                        borderRadius: '50%',
                        border: '1px solid #fff',
                        display: 'inline-block',
                        background: 'red',
                        margin: '-5px -10px',
                        zIndex: 9999,
                      }}
                    ></button>
                    {/* <img
                      src={
                        picture ||
                        profile?.profileImage ||
                        profile1?.profileImage ||
                        defaultImageSrc
                      }
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        const target = e.target as HTMLImageElement;
                        target.src = defaultImageSrc;
                      }}
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: '150px' }}
                    />
                    <div className="d-flex justify-content-center my-3">
                      <input
                        type="file"
                        id="imageUpload"
                        accept=".png, .jpg, .jpeg"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          imageOnChange(event)
                        }
                        style={{
                          backgroundColor: '#f8f8f8',
                          padding: '1px 1px',
                          width: '200px',
                        }}
                      />
                    </div> */}

                    <label
                      htmlFor="photo-upload"
                      className="custom-file-upload fas"
                    >
                      <div className="img-wrap img-upload">
                        <img
                          src={
                            picture ||
                            profile?.profileImage ||
                            profile1?.profileImage ||
                            defaultImageSrc
                          }
                          onError={(
                            e: React.SyntheticEvent<HTMLImageElement, Event>
                          ) => {
                            const target = e.target as HTMLImageElement;
                            target.src = defaultImageSrc;
                          }}
                          alt="Profile"
                          style={{ width: 'auto', height: '100%' }}
                        />
                      </div>

                      <input
                        type="file"
                        id="photo-upload"
                        accept=".png, .jpg, .jpeg"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          imageOnChange(event)
                        }
                      />
                    </label>

                    <h5 className="my-3 text-capitalize">
                      {profile?.firstName && profile?.lastName
                        ? `${profile.firstName} ${profile.lastName}`
                        : profile1?.firstName && profile1?.lastName
                        ? `${profile1.firstName} ${profile1.lastName}`
                        : ''}
                    </h5>
                    <p className=" mb-1 text-primary  text-capitalize">
                      {profile?.firstName || profile1?.firstName}
                    </p>
                    <p className="text-muted mb-4">
                      Bcc House, First Floor, 8/5/5 Manorama Ganj, INDORE
                    </p>
                    <div className="list-unstyled">
                      <li>
                        <p className="fas fa-phone me-2">
                          +
                          {` ${
                            profile?.phoneNumber
                              ? profile?.phoneNumber
                              : profile1?.phoneNumber
                          }`}
                        </p>
                      </li>

                      <li>
                        <p className="fas fa-envelope me-2">{` ${
                          profile?.email ? profile?.email : profile1?.email
                        }`}</p>
                      </li>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 card">
                <div className="row">
                  <div className="col mt-2">
                    <div className="row p-2">
                      <div className="col-12">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <Field
                          className="form-control "
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
                    </div>
                    <div className="row p-2">
                      <div className="col-12">
                        <label htmlFor="lastlName" className="form-label">
                          Last Name
                        </label>
                        <Field
                          className="form-control "
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
                    <div className="row p-2">
                      <div className="col-12">
                        <label htmlFor="number" className="form-label">
                          Phone Number
                        </label>
                        <Field
                          className="form-control "
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
                  </div>
                </div>
                <hr />
                <p className="fw-bold text-decoration-underline fst-italic fs-6">
                  Change Password (Optional)
                </p>
                <div className="row mt-4">
                  <div className="col">
                    <div className="mb-3 mt-3">
                      <label htmlFor="number" className="form-label">
                        Password
                      </label>
                      <Field
                        className="form-control "
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
                    <div className="mb-3 mt-4">
                      <label htmlFor="number" className="form-label">
                        Confirm Password
                      </label>
                      <Field
                        className="form-control "
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
                </div>
                <div className="row mb-2">
                  <div className="col-sm-12">
                    <button
                      className="btn btn-secondary px-4 m-2"
                      onClick={() => router.push('/dashboard')}
                      type="button"
                    >
                      Cancal
                    </button>

                    <button className="btn btn-primary px-4 m-2" type="submit">
                      Update
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

export default Profile;
