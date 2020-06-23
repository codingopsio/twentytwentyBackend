import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { connect } from "react-redux";
import { updateName } from "../../actions/auth";
import "./AccountForm.css";
import { updatePassword } from "../../actions/auth";

const AccountForm = ({ user, updateName, updatePassword }) => {
  const [modalNameState, setModalNameState] = useState(false);
  const [modalPassState, setModalPassState] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const onHandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (formData.name.trim().length !== 0) {
      updateName(formData.name);

      setFormData({
        name: "",
        password: "",
        newpassword: "",
        oldpassword: "",
      });
      onCloseModal();
    } else {
      setResponseError("Please enter a valid name");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      updatePassword(formData.oldpassword, formData.newpassword);
    } catch (err) {
      console.log(err);
    }

    // if(formData.oldpassword.trim().length !== 0 && formData.oldpassword.length >= 6)

    setFormData({
      name: "",
      password: "",
      newpassword: "",
      oldpassword: "",
    });
    onClosePassModal();
  };

  const onOpenModal = () => {
    setModalNameState(true);
  };

  const onOpenPasswordModal = () => {
    setModalPassState(true);
  };

  const onCloseModal = () => {
    setModalNameState(false);
    setResponseError("");
  };
  const onClosePassModal = () => {
    setModalPassState(false);
  };

  return (
    <>
      <div className="form-heading">
        <div className="form-img">{user.name.trim()[0]}</div>
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
              <i className="fas fa-pencil-alt"></i> Edit
            </Link>
            <Modal open={modalNameState} onClose={onCloseModal} center>
              <form
                onSubmit={(e) => handleNameSubmit(e)}
                style={{ padding: "2rem" }}
              >
                <label
                  style={{
                    display: "block",
                    width: "100%",
                    marginBottom: "15px",
                    fontSize: "17px",
                  }}
                  htmlFor="fname"
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

                {responseError ? (
                  <span className="reserror">{responseError}</span>
                ) : null}

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
            <i className="fas fa-check-circle"></i> Verified
          </div>
        </div>

        <div className="form-box-row">
          <div>
            <div className="account-name">Reset password</div>
            <div className="name">Change password for your account here</div>
          </div>
          <div>
            <Link to="#" className="btn-edit" onClick={onOpenPasswordModal}>
              <i className="fas fa-pencil-alt"></i> Edit
            </Link>
            <Modal open={modalPassState} onClose={onClosePassModal} center>
              <form
                style={{ padding: "2rem" }}
                onSubmit={(e) => handlePasswordSubmit(e)}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "15px",
                    fontSize: "17px",
                  }}
                  htmlFor="fname"
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
                  onChange={(e) => onHandleChange(e)}
                  value={formData.oldpassword}
                />

                <label
                  style={{
                    display: "block",
                    marginBottom: "15px",
                    fontSize: "17px",
                  }}
                  htmlFor="fname"
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
                  onChange={(e) => onHandleChange(e)}
                  value={formData.newpassword}
                />

                <label
                  style={{
                    display: "block",
                    marginBottom: "15px",
                    fontSize: "17px",
                  }}
                  htmlFor="fname"
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
                  onChange={(e) => onHandleChange(e)}
                  value={formData.confirmpassword}
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateName: (name) => dispatch(updateName(name)),
    updatePassword: (oldPassword, newPassword) =>
      dispatch(updatePassword(oldPassword, newPassword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);
