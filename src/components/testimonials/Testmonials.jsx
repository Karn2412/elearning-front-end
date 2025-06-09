import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonialData = [
  {
    id: 1,
    name: "John Doe",
    position: "Student",
    message:
      "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
    image:
      "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Student",
    message:
      "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
    image:
      "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  {
    id: 3,
    name: "John Doe",
    position: "Student",
    message:
      "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
    image:
      "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
  },
  {
    id: 4,
    name: "Jane Smith",
    position: "Student",
    message:
      "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
    image:
      "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
];

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
  >
    <Card className="text-center shadow-sm border-0 rounded-4 p-3 h-100">
      <Quote className="text-muted mb-2 mx-auto" />
      <Card.Img
        variant="top"
        src={testimonial.image}
        className="rounded-circle mx-auto"
        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Text className="text-secondary fst-italic">
          "{testimonial.message}"
        </Card.Text>
        <Card.Title className="mt-3 text-primary">{testimonial.name}</Card.Title>
        <small className="text-muted">{testimonial.position}</small>
      </Card.Body>
    </Card>
  </motion.div>
);

const Testimonials = () => (
  <Container className="my-5 py-5">
    <motion.h2
      className="text-center fw-bold mb-4 text-primary"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      What Our Students Say
    </motion.h2>
    <Row xs={1} sm={1} md={2} lg={3} xl={4} className="g-4">
      {testimonialData.map((testimonial) => (
        <Col key={testimonial.id}>
          <TestimonialCard testimonial={testimonial} />
        </Col>
      ))}
    </Row>
  </Container>
);

export default Testimonials;
