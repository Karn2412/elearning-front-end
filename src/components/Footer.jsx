// Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-success text-light py-4 mt-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container text-center">
        <p className="mb-1">
          © {new Date().getFullYear()} Your E-Learning Platform. All rights reserved.
        </p>
        <p className="mb-2">
          Made with <span className="text-danger">❤️</span> by{" "}
          <a
            href="https://github.com/karn2412"
            className="text-decoration-none text-white fw-semibold hover-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Eldho Raj
          </a>
        </p>
        <div className="d-flex justify-content-center gap-4">
          <a href="#" className="text-white fs-5 hover-icon">
            <FaFacebookF />
          </a>
          <a href="#" className="text-white fs-5 hover-icon">
            <FaTwitter />
          </a>
          <a href="#" className="text-white fs-5 hover-icon">
            <FaInstagram />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
