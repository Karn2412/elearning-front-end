import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaChalkboardTeacher, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { server } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast/headless';
import { UserData } from '../../context/Context';

function CourseDiscription({user}) {
  const params = useParams();
  const { fecthCourse, course ,fecthCourses,fecthMyCourse} = CourseData();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { fecthUser } = UserData();
  
  useEffect(() => {
    fecthCourse(params.id);
    
  }, []);

  const checkoutHandler = async () => {
      const token = localStorage.getItem('token')
      setLoading(true)

      const {data:{order}} = await axios.post(`${server}/api/course/checkout/${params.id}`,{},
        {headers:
          {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const options = {
         "key": "rzp_test_SuQKZHcATUJI9x", // Enter the Key ID generated from the Dashboard
    "amount": order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "E-learniing", //your business name
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": order.id,
     
    "handler": async function(response) {
      const {   razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature, } = response;

        try {
          const {data} = await axios.post(`${server}/api/verification/${params.id}`,{
            razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
          },{
            headers:{
              Authorization: `Bearer ${token}`,
            }
          })
          await fecthUser()
          await fecthCourses()
          await fecthMyCourse()
          toast.success(data.message)
          setLoading(false)
          navigate(`/payment-success/${razorpay_payment_id}`)
        } catch (error) {
          toast.error(error.response.data.message)
          setLoading(false)
        }
    },
    "theme": {
        "color": "#3399cc"
    } 
      }
      const razorpay =new window.Razorpay(options);
      razorpay.open()
      };

 
    
  
  return (
    <>
     
        {course && (
            <Container className="mt-5  py-5">
              <Row className="align-items-center justify-content-center g-4 flex-wrap-reverse">
                <Col md={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="fw-bold mb-3">{course.title}</h2>
                    <p className="mb-2 text-muted">
                      <FaChalkboardTeacher className="me-2" />
                      Instructor: {course.createdBy}
                    </p>
                    <p className="mb-2 text-muted">
                      <FaClock className="me-2" />
                      Duration: {course.duration} hrs
                    </p>
                    <p className="mb-4 fs-5">
                      Let&apos;s get started with this course at{' '}
                      <strong>₹{course.price}</strong>
                    </p>
                    {
                        user && user.subscription.includes(course._id)?
                        (<Button onClick={()=>{`/course/study/${course._id}`}} variant="primary" size="lg" className="rounded-pill px-4">
                        study
                      </Button>) : 
                      (<Button onClick={checkoutHandler} variant="primary" size="lg" className="rounded-pill px-4">
                      Buy Now
                    </Button>)
                    }
                    
                  </motion.div>
                </Col>
    
                <Col md={6} className="text-center">
                  <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                    <Card className="shadow rounded-4 overflow-hidden border-0">
                      <Card.Img
                        src={`${server}/${course.image}`}
                        alt={course.title}
                        style={{ height: '250px', objectFit: 'cover' }}
                      />
                    </Card>
                  </motion.div>
                </Col>
              </Row>
            </Container>
          )}
     
    </>
  );
}

export default CourseDiscription;
