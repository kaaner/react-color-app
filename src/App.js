import React from "react";

import "./App.css";

import Container from "./Container";

import { UserModalProvider } from "./contexts/UserModalContext";

function App() {
  return (
    <UserModalProvider>
      <Container />
    </UserModalProvider>
  );
}

export default App;
