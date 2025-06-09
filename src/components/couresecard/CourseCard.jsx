import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaChalkboardTeacher, FaClock, FaRupeeSign } from "react-icons/fa";
import { motion } from "framer-motion";
import { server } from "../../main";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../context/Context";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();

  const {fecthcourses} = CourseData()

const deleteHandler = async (id) => {
  const token = localStorage.getItem("token");

  if (confirm("Are you sure you want to delete this course?")) {
    try {
      const { data } = await axios.delete(`${server}/api/course/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message);
      fecthcourses();
    } catch (error) {
      const message =
        error?.response?.data?.message || "Something went wrong while deleting the course.";
      toast.error(message);
      console.error("Delete error:", error);
    }
  }
};


  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      style={{ flex: "1 1 280px", maxWidth: "320px" }}
    >
      <Card className="shadow-sm rounded-4 overflow-hidden border-0 h-100">
        <Card.Img
          variant="top"
          src={`${server}/${course.image}`}
          alt={course.title}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="fw-semibold fs-5 text-center">
              {course.title}
            </Card.Title>
            <div className="text-muted small">
              <div>
                <FaChalkboardTeacher className="me-2" />
                Instructor: {course.createdBy}
              </div>
              <div>
                <FaClock className="me-2" />
                Duration: {course.duration} hrs
              </div>
              <div>
                <FaRupeeSign className="me-2" />
                Price: ₹{course.price}
              </div>
            </div>
          </div>
          {isAuth ? (
            <>
            {user && user.role !== 'admin'?(
              <>
              {user.subscription.includes(course._id)?(
                <Button
                variant="primary"
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="w-100 rounded-pill mt-3"
              >
                Study
              </Button> ):
             (     <Button
              variant="primary"
              onClick={() => navigate(`/course/${course._id}`)}
              className="w-100 rounded-pill mt-3"
            >
              Get Started
            </Button>
              )}
              </>
            ):(   <Button
              variant="primary"
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="w-100 rounded-pill mt-3"
            >
              Study
            </Button>)}
         
            </>
          ) : (
            <Button
              variant="primary"
              onClick={() => navigate("/login")}
              className="w-100 rounded-pill mt-3"
            >
              Get Started
            </Button>
          )}
          { user && user.role === "admin" && <Button
              variant="danger"
            
              className="w-100 rounded-pill mt-3"
              onClick= {()=>deleteHandler(course._id) }
            >
              Delete
            </Button>}
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
