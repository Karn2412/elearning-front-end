import React from 'react';
import { CourseData } from '../../context/CourseContext';
import CourseCard from '../../components/couresecard/CourseCard';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

function Dashboard() {
  const { myCourse } = CourseData();

  return (
    <Container className="my-5">
      <h2 className="text-center fw-bold mb-4">All Enrolled Courses</h2>
      {myCourse && myCourse.length > 0 ? (
        <Row className="g-4">
          {myCourse.map((course) => (
            <Col md={6} lg={4} key={course._id}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <CourseCard course={course} />
              </motion.div>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">No Course Enrolled</p>
      )}
    </Container>
  );
}

export default Dashboard;
