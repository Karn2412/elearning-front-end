import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Info, User, Home } from 'lucide-react';

const Header = (isAuth) => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar expand="lg" bg="light" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary">
            <GraduationCap className="me-2" />
            E-Learning
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link as={Link} to="/" className="d-flex align-items-center me-3">
                <Home className="me-1" size={18} /> Home
              </Nav.Link>
              <Nav.Link as={Link} to="/courses" className="d-flex align-items-center me-3">
                <BookOpen className="me-1" size={18} /> Courses
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="d-flex align-items-center me-3">
                <Info className="me-1" size={18} /> About
              </Nav.Link>
              {
                isAuth?(<Nav.Link as={Link} to="/account" className="d-flex align-items-center">
                  <User className="me-1" size={18} /> Account
                </Nav.Link>):(<Nav.Link as={Link} to="/login" className="d-flex align-items-center">
                <User className="me-1" size={18} /> Login
              </Nav.Link>)
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default Header;
