//Swathi

import React from "react";
import Forum from "./Forum/Forum";
import { Col, Row, Button, Nav, TabContainer, Tab } from "react-bootstrap";
import "./style.css";

function SideNavbar() {
  return (
    <div>
      <TabContainer id="left-tabs-example" defaultActiveKey="Forum">
        <Row className="sidenav">
          <Col sm={3}>
            <Nav variant="pills" className="sidebar">
              <Nav.Item>
                <Nav.Link eventKey="Map">Map</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Forum">Forum</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Volunteer Registration">
                  Volunteer Registration
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Special Need Registration">
                  Special Need Registration
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="SignOut">SignOut</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content className="tab">
              <Tab.Pane eventKey="Map"></Tab.Pane>
              <Tab.Pane eventKey="Forum">
                <Forum />
              </Tab.Pane>
              <Tab.Pane eventKey="Volunteer Registration"></Tab.Pane>
              <Tab.Pane eventKey="Special Need Registration"></Tab.Pane>
              <Tab.Pane eventKey="SignOut"></Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </TabContainer>
    </div>
  );
}

export default SideNavbar;
