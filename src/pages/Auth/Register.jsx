import React, { useState } from 'react'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { UserData } from '../../context/Context';


function Register() {
  const navigate = useNavigate()
  const {btnLoading,registerUser} = UserData()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name,setName]= useState('')


const  submitHandler = async(e)=>{
  e.preventDefault()
  await registerUser(name,email,password,navigate)
}

  return (
    <>

    <Container className="d-flex  p-4 justify-content-center" style={{ minHeight: '100vh' }}>
        
      <Row className="w-100 justify-content-center ">
        <Col md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-4 mt-5 shadow-lg border-0 rounded-4">
              <h2 className="text-center mb-4 text-primary fw-bold">Register</h2>
              <Form onSubmit={submitHandler}>
              <Form.Group controlId="formName" className="mb-3">
                  <Form.Label className="fw-semibold">Name</Form.Label>
                  <div className="d-flex align-items-center border rounded-3 px-2 bg-light">
                    <User className="me-2 text-secondary" size={18}/>
                    <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your Name" className="border-0 bg-transparent shadow-none" />
                  </div>
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label className="fw-semibold">Email</Form.Label>
                  <div className="d-flex align-items-center border rounded-3 px-2 bg-light">
                    <Mail className="me-2 text-secondary" size={18} />
                    <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" className="border-0 bg-transparent shadow-none" />
                  </div>
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <div className="d-flex align-items-center border rounded-3 px-2 bg-light">
                    <Lock className="me-2 text-secondary" size={18} />
                    <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="border-0 bg-transparent shadow-none" />
                  </div>
                </Form.Group>

                <Button variant="primary" disabled={btnLoading} type="submit" className="w-100 rounded-pill fw-semibold">
                  {btnLoading?"please wait....":"Register"}
                </Button>
              </Form>
              <div className="text-center mt-3">
                <span>Do you have an account? </span>
                <Link to="/login" className="text-decoration-none fw-semibold text-primary">
                  Login
                </Link>
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Register