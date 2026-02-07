import React from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col, UncontrolledPopover, PopoverBody } from "reactstrap";

// core components
import DefaultNavbar from "components/DefaultNavbar.js";

// images
import registerPageBackground from "assets/img/login-image.jpg";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "utils/auth.js";

function RegisterPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/";

  async function handleRegisterSubmit(event) {
    event.preventDefault();

    const target = event.target;
    const displayname = target.elements.displayname.value;
    const username = target.elements.username.value;
    const password = target.elements.password.value;
    const passwordconfirm = target.elements.passwordconfirm.value;

    if (password !== passwordconfirm) return;

    let success = false;
    try {
      success = await auth.register(displayname, username, password);
    } catch (e) {
      console.log(e);
    }
    if (success) {
      navigate(from, { replace: true });
    }
  }

  return (
    <>
      <DefaultNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: `url(${registerPageBackground})`,
        }}
      >
        <div className="filter" />
        <Container style={{"marginTop": "unset"}}>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Welcome</h3>
                <Form className="register-form" onSubmit={handleRegisterSubmit}>
                  <label>Your Name</label>
                  <Input placeholder="Name" type="text" name="displayname"/>
                  <label>Username</label>
                  <Input placeholder="Username" type="text" name="username"/>
                  <label>Password</label>
                  <Input placeholder="Password" type="password" name="password"/>
                  <label></label>
                  <Input placeholder="Confirm Password" type="password" name="passwordconfirm"/>
                  <Button block className="btn-round" color="danger" id="submit">
                    Register
                  </Button>
                  <UncontrolledPopover trigger="focus" placement="right" target="submit">
                    <PopoverBody>Registration Error. Make sure name and username are alphanumeric, password alphanumeric/special</PopoverBody>
                  </UncontrolledPopover>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            &copy; {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by Creative Tim
          </h6>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
