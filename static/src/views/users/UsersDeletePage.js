import React from "react";

// reactstrap components
import {
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  UncontrolledPopover,
  PopoverBody,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import DefaultNavbar from "components/DefaultNavbar.js";

import PageHeaderXS from "components/Headers/PageHeaderXS.js"

import { useAuth } from "utils/auth.js";
import { useNavigate } from "react-router-dom";

// images
import storesPageBackground from "assets/img/fabio-mangione.jpg";

function DeletePage() {
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleDeleteSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.elements.username.value;
    const password = target.elements.password.value;

    let response;
    response = await fetch("/api/users/delete", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        username, password,
        token: auth.token,
      }),
    });
    response = await response.json();
    console.log("Delete User");
    console.log(response);
    if (response.ok) {
      auth.logout();
      navigate("/");
    }
  };

  return (
    <>
      <DefaultNavbar />
      <PageHeaderXS backgroundImage={storesPageBackground} />
      <div className="section">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="8">
              <h2 className="text-center">Delete Account</h2>
              <Form className="contact-form" onSubmit={handleDeleteSubmit}>
                <label>Username</label>
                <InputGroup>
                  <InputGroupText>
                    <i className="nc-icon nc-single-02" />
                  </InputGroupText>
                  <Input placeholder="Username" type="text" name="username"/>
                </InputGroup>
                <label>Password</label>
                <InputGroup>
                  <InputGroupText>
                    <i className="nc-icon nc-key-25" />
                  </InputGroupText>
                  <Input placeholder="Password" type="password" name="password"/>
                </InputGroup>
                <Button block className="btn-fill" color="danger" size="lg" id="submit">
                  Confirm Delete
                </Button>
                <UncontrolledPopover trigger="focus" placement="right" target="submit">
                    <PopoverBody>Delete Error. Try Again!</PopoverBody>
                </UncontrolledPopover>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default DeletePage;
