import React from "react";
import { Link } from "react-router-dom";
import "./AccountForm.css";
import { connect } from "react-redux";

const AccountForm = ({ user }) => {
  return (
    <>
      <div className="form-heading">
        <div className="form-img">S</div>
        <div className="form-name">{user.name}</div>
      </div>

      <div className="form-box">
        <div className="form-box-row">
          <div>
            <div className="account-name">Account Name</div>
            <div className="name">{user.name}</div>
          </div>
          <div>
            <Link to="#" className="btn-edit">
              <i class="fas fa-pencil-alt"></i> Edit
            </Link>
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
            <Link to="#" className="btn-edit">
              <i class="fas fa-pencil-alt"></i> Edit
            </Link>
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
