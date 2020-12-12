import React, { useEffect, useState, useContext } from "react";
import { Layout, notification, Button } from "antd";

import {
  initiateSocket,
  subscribeToColor,
  sendColor,
  //subscribeNewUsers,
  disconnectUser,
} from "./socketHook";

import UserModal from "./components/UserModal";

import UserModalContext from "./contexts/UserModalContext";

const { Content, Header } = Layout;

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message,
  });
};

function Container() {
  const [color, setColor] = useState("#FFFF00");
  const { setIsModalVisible } = useContext(UserModalContext);

  useEffect(() => {
    initiateSocket();

    setIsModalVisible(true);

    subscribeToColor((err, color) => {
      if (err) return;
      openNotificationWithIcon("success", "new color: " + color);
      setColor(color);
    });

    // subscribeNewUsers((err, message) => {
    //   if (err) return;
    //   openNotificationWithIcon("success", message);
    //   console.log(message);
    // });

    disconnectUser((err, message) => {
      if (err) return;
      openNotificationWithIcon("error", message);
      console.log(message);
    });
  }, [setIsModalVisible]);

  const handleClick = () => {
    console.log(color);
    sendColor(color);
  };

  return (
    <div className="App">
      <Layout className="layout">
        <Header style={{ backgroundColor: color }}>
          <UserModal />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <Button type="default" size="large" onClick={handleClick}>
            Change
          </Button>
        </Header>
        <Content style={{ backgroundColor: color }}></Content>
      </Layout>
    </div>
  );
}

export default Container;
