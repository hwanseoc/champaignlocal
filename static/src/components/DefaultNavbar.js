import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  Container,
} from "reactstrap";

import { useAuth } from "utils/auth.js";

function DefaultNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/"
            title="Champaign Local"
            tag={Link}
          >
            Champaign Local
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink to="/stores" tag={Link}>
                <i className="nc-icon nc-shop" /> Stores
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/questions" tag={Link}>
                <i className="nc-icon nc-zoom-split" /> Questions
              </NavLink>
            </NavItem>
            { !auth.user &&
              <NavItem>
                <NavLink to="/users/login" state={{from: location.pathname}} tag={Link}>
                  <i className="nc-icon nc-key-25" /> Login
                </NavLink>
              </NavItem>
            }
            { auth.user &&
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {auth.user}
                </DropdownToggle>
                <DropdownMenu className="dropdown-danger" end>
                  <DropdownItem href="/users/update">
                  <i className="nc-icon nc-settings-gear-65" /> Account Settings
                  </DropdownItem>
                  <DropdownItem onClick={()=>{auth.logout(); navigate("/");}}>
                    <i className="nc-icon nc-key-25" /> Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            }
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default DefaultNavbar;
