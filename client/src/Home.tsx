import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
  Table
} from "react-bootstrap";

interface Props {}

interface Project {
  name: string;
  path: string;
}

export const Home: React.FC<Props> = () => {
  const projects: Project[] = [
    { name: "test", path: "C:/test" },
    { name: "test2", path: "C:/test/test2" }
  ];

  return (
    <>
      <Navbar bg="info" variant="dark">
        <Navbar.Brand className="px-3">Stratus</Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link>Create Menu</Nav.Link>
            <Nav.Link>Create Grammar</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={6}>
            <Form.Label style={{ color: "white" }}>Current Project</Form.Label>
            <Form.Control as="select">
              {projects.map((project, index) => (
                <option key={index}>{project.name}</option>
              ))}
            </Form.Control>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button variant="success">Add Project</Button>
          </Col>
        </Row>
        <div className="text-white mt-5">Available Projects</div>
        <Table striped hover responsive variant="dark">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>ProjectPath</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <th>{project.name}</th>
                <th>{project.path}</th>
                <th className="d-flex justify-content-center">X</th>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
