import React from 'react';
import { CourseData } from '../../context/CourseContext';
import CourseCard from '../../components/couresecard/CourseCard';
import './courses.css';

function Courses() {
  const { courses } = CourseData();
  console.log(courses);

  return (
    <>
      <div className="courses">
        <h2>Available Courses</h2>

        <div className="course-container">
          {courses && courses.length > 0 ? (
            courses.map((e) => (
              <CourseCard key={e._id} course={e} />
            ))
          ) : (
            <p>No courses available yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Courses;
