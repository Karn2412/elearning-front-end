// AboutUs.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaLaptopCode, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const AboutUs = () => {
  return (
   <>
   
    <div className="py-5 bg-light text-dark">
        
        <div className="container">
          <motion.h2
            className="text-center fw-bold mb-4 text-primary"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Us
          </motion.h2>
  
          <motion.p
            className="lead text-center mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            We empower learners through expertly designed online courses that balance practical skills with theoretical insights.
            Our goal is to make learning personalized, engaging, and accessible to all.
          </motion.p>
  
          <div className="row text-center">
            <motion.div
              className="col-md-4 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-4 shadow rounded bg-white h-100">
                <FaLaptopCode className="fs-1 text-primary mb-3" />
                <h5 className="fw-bold">Tech-Driven Learning</h5>
                <p>
                  We use the latest tools and interactive modules to ensure a seamless learning experience for every student.
                </p>
              </div>
            </motion.div>
  
            <motion.div
              className="col-md-4 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-4 shadow rounded bg-white h-100">
                <FaChalkboardTeacher className="fs-1 text-success mb-3" />
                <h5 className="fw-bold">Expert Instructors</h5>
                <p>
                  Our certified instructors bring real-world experience and passion to every course they deliver.
                </p>
              </div>
            </motion.div>
  
            <motion.div
              className="col-md-4 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-4 shadow rounded bg-white h-100">
                <FaUserGraduate className="fs-1 text-danger mb-3" />
                <h5 className="fw-bold">Student-Centered Approach</h5>
                <p>
                  Every course is tailored to student needs, offering flexibility, support, and motivation at every step.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
     
   </>
  );
};

export default AboutUs;
