import React, { useState, useEffect } from 'react';
// import {} from "antd";
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';

function CompactApp({ app }) {
  console.log(app);

  const [modalState, setModalState] = useState({
    visible: false,
    loading: false,
  });

  const showModal = () => {
    setModalState({
      visible: true,
    });
  };

  const handleOk = e => {
    console.log(e);

    setModalState({ loading: true });
    setTimeout(() => {
      setModalState({ loading: false, visible: false });
    }, 3000);
  };

  const handleSubmit = e => {
    console.log(e);
    setModalState({
      visible: false,
    });
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal with customized footer
      </Button>
      <Modal
        visible={modalState.visible}
        title="Title"
        onOk={handleOk}
        onCancel={handleSubmit}
        footer={[
          <Button key="back" onClick={handleSubmit}>
            {' '}
            {/*Change handleSubmit to later work to reject apps*/}
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

//   <div>
//     <h3> Compact App </h3>
//     <h4>{app.name}</h4>
//     {/* <h5>{app.organization.name}</h5> */}
//     <h5>{app.status}</h5>
//   </div>
// <Card title = {app.name}>

// </Card>

/* <Button type="primary" onClick={showModal}>
    {app.name} {app.organization.name} {app.status}
  </Button>
  <Modal
    title={app.name}
    centered
    visible={modalState.visible}
    onOk={handleOk}
    onCancel={handleCancel}
    okButtonProps={{ disabled: true }}
    cancelButtonProps={{ disabled: true }}
  >
    <h3>Org: {app.organization.name}</h3>
    <h3>Status: {app.status}</h3>
    <p>Reason: {app.reason}</p>
  </Modal> */
