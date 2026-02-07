import React from "react";

// reactstrap components
import {
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components

function StoresCreate() {
  async function handleCreateSubmit(event) {
    event.preventDefault();
    const target = event.target;
    let response;
    response = await fetch("/api/stores/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: target.elements.createName.value,
        location: target.elements.createLocation.value,
        hours: target.elements.createHours.value,
        owner: target.elements.createOwner.value,
        covid_restrictions: target.elements.createCovidRestrictions.value
      }),
    });
    response = await response.json();
    console.log("creating store");
    console.log(response);
    alert(`Created Store ID: ${response.store.id}`);
  };

  return (
    <div className="section landing-section">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="8">
            <h2 className="text-center">Add New Local Store!</h2>
            <Form className="contact-form" onSubmit={handleCreateSubmit}>
              <Row>
                <Col md="6">
                  <label>Store Name</label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="nc-icon nc-single-02" />
                    </InputGroupText>
                    <Input placeholder="Store Name" type="text" name="createName"/>
                  </InputGroup>
                </Col>
                <Col md="6">
                  <label>Store Location</label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="nc-icon nc-email-85" />
                    </InputGroupText>
                    <Input placeholder="Location" type="text" name="createLocation"/>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <label>Opening Hours</label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="nc-icon nc-single-02" />
                    </InputGroupText>
                    <Input placeholder="Open Hours" type="text" name="createHours"/>
                  </InputGroup>
                </Col>
                <Col md="6">
                  <label>Store Owner</label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="nc-icon nc-single-02" />
                    </InputGroupText>
                    <Input placeholder="Owner Name" type="text" name="createOwner"/>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <label>Covid Restrictions</label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="nc-icon nc-single-02" />
                    </InputGroupText>
                    <Input placeholder="OPEN, CLOSED, or OPEN(takeout)" type="text" name="createCovidRestrictions"/>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col className="ml-auto mr-auto" md="4">
                  <Button className="btn-fill" color="danger" size="lg">
                    Send Request
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default StoresCreate;
