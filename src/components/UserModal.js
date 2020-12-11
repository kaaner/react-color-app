import React, { useContext } from "react";
import { Modal, Button, Input, Tooltip, notification } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

import { subscribeToUserName, sendUserName } from "../socketHook";

import UserModalContext from "../contexts/UserModalContext";

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message,
  });
};

function UserModal() {
  const { userName, setUserName } = useContext(UserModalContext);

  const { isModalVisible, setIsModalVisible } = useContext(UserModalContext);

  const handleOk = () => {
    setIsModalVisible(false);
    sendUserName(userName);
    subscribeToUserName((err, userName) => {
      if (err) return;
      openNotificationWithIcon("success", "new user login: " + userName);
      setUserName(userName);
    });
  };

  return (
    <>
      <Modal
        visible={isModalVisible}
        title="Hi, user!"
        onOk={handleOk}
        //onCancel={handleCancel}
        closable="false"
        maskClosable="false"
        keyboard="false"
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Input
          placeholder="Enter your username"
          value={userName}
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Enter a valid user name!">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
          onChange={(e) => setUserName(e.target.value)}
        />
      </Modal>
    </>
  );
}

export default UserModal;
