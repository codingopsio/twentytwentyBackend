import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { connect } from "react-redux";
import "./AccountForm.css";

const AccountForm = ({ user }) => {
  const [modalNameState, setModalNameState] = useState(false);
  const [modalPassState, setModalPassState] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    newpassword: "",
    oldpassword: "",
  });

  const onHandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      password: "",
      newpassword: "",
      oldpassword: "",
    });
    onCloseModal();
  };

  const onOpenModal = () => {
    setModalNameState(true);
  };

  const onOpenPasswordModal = () => {
    setModalPassState(true);
  };

  const onCloseModal = () => {
    setModalNameState(false);
  };
  const onClosePassModal = () => {
    setModalPassState(false);
  };

  return (
    <>
      <div className="form-heading">
        <div className="form-img">{user.name.charAt(0)}</div>
        <div className="form-name">{user.name}</div>
      </div>

      <div className="form-box">
        <div className="form-box-row">
          <div>
            <div className="account-name">Account Name</div>
            <div className="name">{user.name}</div>
          </div>
          <div>
            <Link to="#" className="btn-edit" onClick={onOpenModal}>
              <i class="fas fa-pencil-alt"></i> Edit
            </Link>
            <Modal open={modalNameState} onClose={onCloseModal} center>
              <form
                onSubmit={(e) => onHandleSubmit(e)}
                style={{ padding: "2rem" }}
              >
                <label
                  style={{
                    display: "block",
                    width: "100%",
                    marginBottom: "15px",
                    fontSize: "17px",
                  }}
                  for="fname"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name.."
                  style={{
                    display: "block",
                    padding: "0.8rem",
                    marginBottom: "15px",
                    width: "100%",
                  }}
                  onChange={(e) => onHandleChange(e)}
                  value={formData.name}
                />

                <input
                  type="submit"
                  value="Submit"
                  style={{ display: "block", width: "100%", cursor: "pointer" }}
                />
              </form>
            </Modal>
          </div>
        </div>

        <div className="form-box-row">
          <div>
            <div className="account-name">Email Address</div>
            <div className="name">{user.email}</div>
          </div>
          <div className="verified">
            <i class="fas fa-check-circle"></i> Verified
          </div>
        </div>

        <div className="form-box-row">
          <div>
            <div className="account-name">Reset password</div>
            <div className="name">Change password for your account here</div>
          </div>
          <div>
            <Link to="#" className="btn-edit" onClick={onOpenPasswordModal}>
              <i class="fas fa-pencil-alt"></i> Edit
            </Link>
            <Modal open={modalPassState} onClose={onClosePassModal} center>
              <form style={{ padding: "2rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "15px",
                    fontSize: "17px",
                  }}
                  for="fname"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  id="password-1"
                  name="oldpassword"
                  placeholder="Enter Old Password"
                  style={{
                    display: "block",
                    padding: "0.8rem",
                    marginBottom: "15px",
                    width: "100%",
                  }}
                />

                <label
                  style={{
                    display: "block",
                    marginBottom: "15px",
                    fontSize: "17px",
                  }}
                  for="fname"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password-2"
                  name="newpassword"
                  placeholder="Enter New Password"
                  style={{
                    display: "block",
                    padding: "0.8rem",
                    marginBottom: "15px",
                    width: "100%",
                  }}
                />

                <label
                  style={{
                    display: "block",
                    marginBottom: "15px",
                    fontSize: "17px",
                  }}
                  for="fname"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password-3"
                  name="confirmpassword"
                  placeholder="Confirm Password."
                  style={{
                    display: "block",
                    padding: "0.8rem",
                    marginBottom: "15px",
                    width: "100%",
                  }}
                />

                <input
                  type="submit"
                  value="Submit"
                  style={{ display: "block", width: "100%", cursor: "pointer" }}
                />
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(AccountForm);
