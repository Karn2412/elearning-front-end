import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';

import { motion } from 'framer-motion';
import './coursestudy.css';

function CourseStudy({ user }) {
  const navigate = useNavigate();
  const params = useParams();
  const { fecthCourse, course } = CourseData();

  useEffect(() => {
    if (user && user.role !== 'admin' && !user.subscription.includes(params.id)) {
      navigate('/');
    }
  }, [user, params.id, navigate]);

  useEffect(() => {
    if (params?.id) {
      fecthCourse(params.id);
    }
  }, [params?.id, fecthCourse]);

  return (
    <div className="course-container d-flex flex-column align-items-center justify-content-center py-5 px-3 text-center">
      {course && (
        <motion.div
          className="course-card shadow-lg rounded-4 p-4 bg-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={`${server}/${course.image}`}
            alt={course.title}
            className="img-fluid rounded-3 mb-4 course-image"
          />
          <h2 className="fw-bold text-primary mb-3">{course.title}</h2>
          <p className="text-muted mb-3 fs-5">{course.discription}</p>
          <h5 className="mb-2 text-secondary">by - {course.createdBy}</h5>
          <h6 className="mb-4">Duration - {course.duration}</h6>
         <Link to={`/study/${course._id}`} className="course-button mt-3 d-inline-block">
                 Start Learning
               </Link> 
        </motion.div>
      )}
    </div>
  );
}

export default CourseStudy;
