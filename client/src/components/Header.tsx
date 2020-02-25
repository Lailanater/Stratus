import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const HoverableBrand = styled(Navbar.Brand)`
  :hover {
    cursor: pointer;
  }
`;

interface Props {}

export const Header: React.FC<Props> = () => {
  const [canRedirectToHome, setCanRedirectToHome] = useState(false);
  const [canRedirectToCreateMenu, setCanRedirectToCreateMenu] = useState(false);
  const [canRedirectToCreateGrammar, setCanRedirectToCreateGrammar] = useState(
    false
  );

  if (canRedirectToCreateMenu) {
    return <Redirect to="/createMenu" />;
  } else if (canRedirectToCreateGrammar) {
    return <Redirect to="/createGrammar" />;
  } else if (canRedirectToHome) {
    return <Redirect to="/" />;
  }

  return (
    <Navbar bg="info" variant="dark">
      <HoverableBrand
        className="px-3"
        onClick={() => setCanRedirectToHome(true)}
      >
        Stratus
      </HoverableBrand>
      <Navbar.Collapse>
        <Nav>
          <Nav.Link onClick={() => setCanRedirectToCreateMenu(true)}>
            Create Menu
          </Nav.Link>
          <Nav.Link onClick={() => setCanRedirectToCreateGrammar(true)}>
            Create Grammar
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
