import React from "react";
import { Link } from "react-router-dom";
import "./AccountForm.css";

const AccountForm = () => {
  return (
    <>
      <div className="form-heading">
        <div className="form-img">S</div>
        <div className="form-name">Srijita Bhattacharya</div>
      </div>

      <div className="form-box">
        <div className="form-box-row">
          <div>
            <div className="account-name">Account Name</div>
            <div className="name">Srijita Bhattacharya</div>
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
            <div className="name">srijitakiki10@gmail.com</div>
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

export default AccountForm;
