import { useNavigate } from "react-router-dom";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Button,
} from "react-bootstrap";
import "../css/navBarStyles.css";
import logo from "../images/logo.png";

const CustomNavbar = ({ active }) => {
  const navigate = useNavigate();

  return (
    <header>
      <BootstrapNavbar expand="lg" className="navbar-custom">
        <Container>
          <BootstrapNavbar.Brand href="/">
            <img src={logo} alt="Logo" className="header__logo" />
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Button
                className={`header__button ${
                  active === "home" ? "activee" : ""
                }`}
                onClick={() => {
                  navigate("/");
                }}
              >
                Home <i className="bi bi-house-door-fill"></i>
              </Button>

              <Button
                className={`header__button ms-lg-2 ${
                  active === "properties" ? "activee" : ""
                }`}
                onClick={() => {
                  navigate("/properties");
                }}
              >
                Properties <i class="bi bi-buildings-fill"></i>
              </Button>

              <Button
                className={`header__button ms-lg-2 ${
                  active === "fav" ? "activee" : ""
                }`}
                onClick={() => {
                  navigate("/fav");
                }}
              >
                Favourites <i className="bi bi-heart-fill"></i>
              </Button>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </header>
  );
};

export default CustomNavbar;
