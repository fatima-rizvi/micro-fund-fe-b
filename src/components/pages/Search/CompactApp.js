import React, { useState, useEffect } from 'react';
// import {} from "antd";
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';

function CompactApp({ app }) {
  console.log(app);

  const [modalState, setModalState] = useState({ visible: false });

  const showModal = () => {
    setModalState({
      visible: true,
    });
  };

  const handleOk = e => {
    console.log(e);
    setModalState({
      visible: false,
    });
  };

  const handleCancel = e => {
    console.log(e);
    setModalState({
      visible: false,
    });
  };

  return (
    //   <div>
    //     <h3> Compact App </h3>
    //     <h4>{app.name}</h4>
    //     {/* <h5>{app.organization.name}</h5> */}
    //     <h5>{app.status}</h5>
    //   </div>
    // <Card title = {app.name}>

    // </Card>
    <div>
      <Button type="primary" onClick={showModal}>
        {app.name} {app.organization.name} {app.status}
      </Button>
      <Modal
        title="Basic Modal"
        visible={modalState.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
      >
        <h3>{app.name}</h3>
        <h4>Org: {app.organization.name}</h4>
        <h4>Status: {app.status}</h4>
        <p>Reason: {app.reason}</p>
      </Modal>
    </div>
  );
}

export default CompactApp;
