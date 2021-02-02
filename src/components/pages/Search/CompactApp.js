import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';
import './search.css';

function CompactApp({ app }) {
  // console.log(app);

  const [modalState, setModalState] = useState({
    visible: false,
    loading: false,
  });

  const showModal = () => {
    setModalState({
      ...modalState,
      visible: true,
    });
  };

  const handleOk = e => {
    console.log(e);

    setModalState({ ...modalState, loading: true });
    setTimeout(() => {
      setModalState({ loading: false, visible: false });
    }, 1000);
  };

  const handleSubmit = e => {
    console.log(e);
    setModalState({
      visible: false,
    });
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} className="short-app">
        <p>{app.name}</p>
        <p>{app.organization.name}</p>
        <p>{app.status}</p>
      </Button>
      <Modal
        visible={modalState.visible}
        title={app.name}
        onOk={handleOk}
        onCancel={handleSubmit}
        centered
        footer={[
          <Button key="back" onClick={handleSubmit}>
            Reject
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={modalState.loading}
            onClick={handleOk}
          >
            Accept
          </Button>,
        ]}
      >
        <h3>Org: {app.organization.name}</h3>
        <h3>Status: {app.status}</h3>
        <p>Reason: {app.reason}</p>
      </Modal>
    </div>
  );
}

export default CompactApp;
