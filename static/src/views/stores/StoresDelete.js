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

function StoresDelete() {
  async function handleDeleteSubmit(event) {
    event.preventDefault();
    const target = event.target;
    let response;
    response = await fetch ("/api/stores/delete", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        id: target.elements.deleteid.value
      }),
    });
    response = await response.json();
    console.log("delete store");
    console.log(response);
  };

  return (
    <div className="section landing-section">
    <Container>
      <Row>
      <Col className="ml-auto mr-auto" md="8">
        <h2 className="text-center">Delete Store </h2>
        <Form className="contact-form" onSubmit={handleDeleteSubmit}>
        <Row>
          <Col md="6">
          <label>Which Store?</label>
          <InputGroup>
            <InputGroupText>
              <i className="nc-icon nc-single-02" />
            </InputGroupText>
            <Input placeholder="Store ID" type="text" name="deleteid" />
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

export default StoresDelete;
