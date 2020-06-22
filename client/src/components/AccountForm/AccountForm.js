import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { connect } from 'react-redux';
import './AccountForm.css';

const AccountForm = ({ user }) => {
  const [modalState, setModalState] = useState(false);

  const onOpenModal = () => {
    setModalState(true);
  };
  const onCloseModal = () => {
    setModalState(false);
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
            <Modal open={modalState} onClose={onCloseModal} center>
              <h4>Simple centered modal</h4>
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
            <Link to="#" className="btn-edit" onClick={onOpenModal}>
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
