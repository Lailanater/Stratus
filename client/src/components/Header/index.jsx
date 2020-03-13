import React from "react";
import { Navbar } from "react-bootstrap";
import { Brand } from "./Header.styles";

export const Header = () => {
  return (
    <Navbar bg="dark" className="px-5">
      <Brand as={Navbar.Brand}>Stratus</Brand>
    </Navbar>
  );
};
