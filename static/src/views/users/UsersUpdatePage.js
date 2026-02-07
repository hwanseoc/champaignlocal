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

// images
import storesPageBackground from "assets/img/fabio-mangione.jpg";

// etc
import { useAuth } from "utils/auth.js";
import { useNavigate } from "react-router-dom";

function UpdatePage() {
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleUpdateSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const displayname = target.elements.displayname.value;
    const username = target.elements.username.value;
    const password = target.elements.password.value;
    const passwordconfirm = target.elements.passwordconfirm.value;

    if (password !== passwordconfirm) return;

    let response;
    response = await fetch("/api/users/update", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        displayname, username, password,
        token: auth.token,
      }),
    });
    response = await response.json();
    console.log("Update User");
    console.log(response);
    if (response.ok) {
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
            <Col className="ml-auto mr-auto" md="6">
              <h2 className="text-center">Account Settings</h2>
              <Form className="contact-form" onSubmit={handleUpdateSubmit}>
                <label>Display Name</label>
                <InputGroup>
                  <InputGroupText>
                    <i className="nc-icon nc-single-02" />
                  </InputGroupText>
                  <Input placeholder="Display Name" type="text" name="displayname" />
                </InputGroup>
                <label>Username</label>
                <InputGroup>
                  <InputGroupText>
                    <i className="nc-icon nc-single-02" />
                  </InputGroupText>
                  <Input value={auth.user} type="text" name="username" readOnly/>
                </InputGroup>
                <label>Password</label>
                <InputGroup>
                  <InputGroupText>
                    <i className="nc-icon nc-key-25" />
                  </InputGroupText>
                  <Input placeholder="Password" type="password" name="password"/>
                </InputGroup>
                <label>Confirm Password</label>
                <InputGroup>
                  <InputGroupText>
                    <i className="nc-icon nc-key-25" />
                  </InputGroupText>
                  <Input placeholder="Confirm Password" type="password" name="passwordconfirm"/>
                </InputGroup>
                <Button block className="btn-fill" color="danger" size="lg" id="submit">
                  Update Info
                </Button>
                <UncontrolledPopover trigger="focus" placement="right" target="submit">
                    <PopoverBody>Update Error. Try Again!</PopoverBody>
                </UncontrolledPopover>
              </Form>
              <br />
              <br />
              <h2 className="text-center">Account Deletion</h2>
              <br />
              <br />
              <Button block className="btn-link" color="danger" size="lg" href="/users/delete">
                Account Deletion Page
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default UpdatePage;
