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

function StoresUpdate() {
  async function handleUpdateSubmit(event) {
    event.preventDefault();
    const target = event.target;
    let response;
    response = await fetch("/api/stores/update", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        id: target.elements.updateID.value,
        name: target.elements.updateName.value,
        location: target.elements.updateLocation.value,
        hours: target.elements.updateHours.value,
        owner: target.elements.updateOwner.value,
        covid_restrictions: target.elements.updateCovidRestrictions.value
      }),
    });
    response = await response.json();
    console.log("update store");
    console.log(response);
  };

  return (
    <div className="section landing-section">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="8">
            <h2 className="text-center">Update Store Information</h2>
            <Form className="contact-form" onSubmit={handleUpdateSubmit}>
              <Row>
                <Col md="6">
                  <label>Which Store?</label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="nc-icon nc-single-02" />
                    </InputGroupText>
                    <Input placeholder="Store ID" type="text" name="updateID" />
                  </InputGroup>
                </Col>
                <Col md="6">
                  <label>Update Name</label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="nc-icon nc-single-02" />
                    </InputGroupText>
                    <Input placeholder="Store Name" type="text" name="updateName"/>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <label>Update Location</label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="nc-icon nc-email-85" />
                    </InputGroupText>
                    <Input placeholder="Location" type="text" name="updateLocation" />
                  </InputGroup>
                </Col>
                <Col md="6">
                  <label>Update Hours</label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="nc-icon nc-single-02" />
                    </InputGroupText>
                    <Input placeholder="12:00am-12:00pm" type="text" name="updateHours" />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <label>Update Store Owner</label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="nc-icon nc-single-02" />
                    </InputGroupText>
                    <Input placeholder="Name" type="text" name="updateOwner" />
                  </InputGroup>
                </Col>
                <Col md="6">
                  <label>Update Covid Restrictions</label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="nc-icon nc-single-02" />
                    </InputGroupText>
                    <Input placeholder="OPEN, CLOSED, or OPEN(takeout)" type="text" name="updateCovidRestrictions"/>
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

export default StoresUpdate;
