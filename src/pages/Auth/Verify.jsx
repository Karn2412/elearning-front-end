import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { KeyRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { UserData } from '../../context/Context';

const VerifyAccount = () => {

  const [otp, setOtp] = useState("")
  const {btnLoading,verifyOtp} = UserData()

  const navigate = useNavigate()

  const submitHandler = async(e)=>{
    e.preventDefault()
   await verifyOtp(Number(otp),navigate)
    
  }
  return (
    <>
  
    <Container className="d-flex mt-5 justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-4 shadow-lg border-0 rounded-4">
              <h2 className="text-center mb-4 text-primary fw-bold">Verify Account</h2>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="formOtp" className="mb-3">
                  <Form.Label className="fw-semibold">OTP</Form.Label>
                  <div className="d-flex align-items-center border rounded-3 px-2 bg-light">
                    <KeyRound className="me-2 text-secondary" size={18} />
                    <Form.Control type="number" value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder="Enter OTP" className="border-0 bg-transparent shadow-none" />
                  </div>
                </Form.Group>

                <Button disabled={btnLoading} variant="primary" type="submit" className="w-100 rounded-pill fw-semibold">
                {btnLoading?"please wait....":"Verify"}
                </Button>
              </Form>
              <div className="text-center mt-3">
                <span>Go to </span>
                <Link to="/login" className="text-decoration-none fw-semibold text-primary">
                  Login page
                </Link>
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
    
    </>
  );
};

export default VerifyAccount;
