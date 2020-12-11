import React, { createContext, useState } from "react";

const UserModalContext = createContext(null);

export const UserModalProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const values = {
    userName,
    setUserName,
    isModalVisible,
    setIsModalVisible,
  };

  return (
    <UserModalContext.Provider value={values}>
      {children}
    </UserModalContext.Provider>
  );
};

export default UserModalContext;
