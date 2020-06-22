import React from "react";
import AccountForm from "../../components/AccountForm/AccountForm";
import "./UserAccount.css";

const UserAccount = () => {
  return (
    <>
      <div className="account-container">
        <h1 className="account-heading">Manage Account</h1>
        <AccountForm />
      </div>
    </>
  );
};

export default UserAccount;
