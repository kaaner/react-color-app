import React, { useEffect, useState, useContext } from "react";
import { notification } from "antd";

import {
  initiateSocket,
  subscribeToColor,
  sendColor,
  //subscribeNewUsers,
  disconnectUser,
} from "./socketHook";

import UserModal from "./components/UserModal";

import UserModalContext from "./contexts/UserModalContext";

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message,
  });
};

function Container() {
  const [color, setColor] = useState("#FFFF00");
  const { isModalVisible, setIsModalVisible } = useContext(UserModalContext);

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
  }, []);

  const handleClick = () => {
    console.log(color);
    sendColor(color);
  };

  return (
    <div className="App" style={{ backgroundColor: color }}>
      <UserModal />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <input type="button" value="change color" onClick={handleClick} />
    </div>
  );
}

export default Container;
