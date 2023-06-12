import React from "react";
import { TextareaHTMLAttributes } from "react"; 
const EditProfile: React.FC = () => {
  return (
    <div className="container-fluid p-0">
      <form>
        <div className="row h-100">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                />
                <h5 className="my-3">Rajat Verma</h5>
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-primary">
                    Follow
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary ms-1"
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 card">
            <div className="row">
              <div className="card-header bg-primary text-white">
                Personal Information
              </div>
              <div className="col">
                <div className="row p-2">
                  <div className="col-12">
                    <label htmlFor="firstName" className="form-label">
                      First Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="Enter First Name"
                      name="firstName"
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-12">
                    <label htmlFor="middelName" className="form-label">
                      Middel Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="middelName"
                      placeholder="Enter Middel Name"
                      name="middelName"
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-12">
                    <label htmlFor="lastName" className="form-label">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Enter Last Name"
                      name="lastName"
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row p-2">
                  <div className="col-12">
                    <label htmlFor="middelName" className="form-label">
                      Date of Birth:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="middelName"
                      placeholder="Enter Middel Name"
                      name="middelName"
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-12">
                    <label htmlFor="middelName" className="form-label">
                      Marital Status:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="middelName"
                      placeholder="Enter Middel Name"
                      name="middelName"
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-12">
                    <label htmlFor="middelName" className="form-label">
                      Gender:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="middelName"
                      placeholder="Enter Middel Name"
                      name="middelName"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="card-header bg-primary text-white">
                Contact Information
              </div>
              <div className="col">
                <div className="mb-3 mt-3">
                  <label htmlFor="number" className="form-label">
                    Resident Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="number"
                    placeholder="Enter Number"
                    name="number"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="number" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="number"
                    placeholder="Enter Number"
                    name="number"
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3 mt-3">
                  <label htmlFor="email" className="form-label">
                    Skype ID:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email ID:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col card m-1">
            <div className="row card-header bg-primary text-white">
              Qualification
            </div>
            {/* <h4 className="mb-3 mt-3">Qualification</h4> */}
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="collageName" className="form-label">
                    Collage Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="collageName"
                    placeholder="Enter Collage Name"
                    name="collageName"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="degreeName" className="form-label">
                    Degree Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="degreeName"
                    placeholder="Enter Degree Name"
                    name="degreeName"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="branch" className="form-label">
                    Branch:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="branch"
                    placeholder="Enter Branch"
                    name="branch"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="percentage" className="form-label">
                    Percentage:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="percentage"
                    placeholder="Enter Percentage"
                    name="percentage"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="jYear" className="form-label">
                    Joining Year:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="jYear"
                    name="jYear"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="cYear" className="form-label">
                    Completion Year:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="cYear"
                    name="cYear"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col card m-1">
            <div className="row card-header bg-primary text-white">
              Permanent Address
            </div>
            {/* <h4 className="mb-3 mt-3">Permanent Address</h4> */}
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="address" className="form-label">
                    Address:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter Address"
                    name="address"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="pCity" className="form-label">
                    City:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pCity"
                    placeholder="Enter City"
                    name="pCity"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="pState" className="form-label">
                    State:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pState"
                    placeholder="Enter State"
                    name="pState"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="pCountry" className="form-label">
                    Country:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pCountry"
                    placeholder="Enter Country"
                    name="pCountry"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="pPincode" className="form-label">
                    Pin Code:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="pPincode"
                    placeholder="Enter Branch"
                    name="pPincode"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col  card m-1">
            <div className="row card-header bg-primary text-white">
              Current Address
            </div>
            {/* <h4 className="mb-3 mt-3">Current Address</h4> */}
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="caddress" className="form-label">
                    Address Line 1:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="caddress"
                    placeholder="Enter Address"
                    name="caddress"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="cCity" className="form-label">
                    City:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cCity"
                    placeholder="Enter City"
                    name="cCity"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="cState" className="form-label">
                    State:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cState"
                    placeholder="Enter State"
                    name="cState"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="cCountry" className="form-label">
                    Country:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cCountry"
                    placeholder="Enter Country"
                    name="cCountry"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="cPincode" className="form-label">
                    Pin Code:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="cPincode"
                    placeholder="Enter Branch"
                    name="cPincode"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3 mt-3">
          <div className="col card m-1">
            <div className="row card-header bg-primary text-white">
              Medical Information
            </div>
            {/* <div className="card-header bg-primary">
              <h4 className="">Medical Information</h4>
            </div> */}
            {/* <h4 className="mb-2 mt-3">Medical Information</h4> */}
            <div className="card-body">
              <div className="mb-3 mt-2">
                <label htmlFor="cState" className="form-label">
                  Chronic Disease:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cState"
                  placeholder="Enter State"
                  name="cState"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cState" className="form-label">
                  Allergies:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cState"
                  placeholder="Enter State"
                  name="cState"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cState" className="form-label">
                  Health Condition:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cState"
                  placeholder="Enter State"
                  name="cState"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cState" className="form-label">
                  Past Surgery:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cState"
                  placeholder="Enter State"
                  name="cState"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cState" className="form-label">
                  Blood Group:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cState"
                  placeholder="Enter State"
                  name="cState"
                />
              </div>
            </div>
          </div>
          <div className="col card m-1">
            <div className="row card-header bg-primary text-white">
              Medical Information
            </div>
            <div className="mb-3 mt-5">
              <label htmlFor="handicapped" className="form-label">
                Handicapped:
              </label>
              <input
                type="email"
                className="form-control"
                id="handicapped"
                // placeholder="Enter handicapped"
                name="handicapped"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Relevant Information:
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={10}
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
