import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BookOpenCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Testmonials from '../../components/testimonials/Testmonials';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    
    <Container fluid className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light mt-5 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-4">
          <h1 className="fw-bold display-5 text-primary">
            Welcome to our <span className="text-dark">E-learning Platform</span>
          </h1>
          <p className="lead text-secondary">Learn, Grow, Excel</p>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="primary"
            size="lg"
            className="rounded-pill px-4 py-2 d-flex align-items-center gap-2"
            onClick={() => navigate('/courses')}
          >
            <BookOpenCheck size={20} />
            Get Started
          </Button>
        </motion.div>
      </motion.div>
      <Testmonials/>
    </Container>
   
    </>
  );
};

export default Home;
