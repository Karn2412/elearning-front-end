// ProfileCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaEnvelope, FaUserTag, FaCalendarAlt, FaEdit, FaTachometerAlt, FaPowerOff } from "react-icons/fa";
import { Button } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { UserData } from "../../context/Context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({user}) => {
  const {setIsAuth , setUser} = UserData()
  
  const navigate = useNavigate()

  const logoutHandler = ()=>{
    localStorage.clear()
    setUser([])
    setIsAuth(false)
    toast.success("Logged Out")
    navigate('/login')
  }
  console.log(user)


  return (
   <>
  {
    user && (<div className="d-flex justify-content-center mt-5 mb-5 py-4 bg-light">
        <motion.div
          className="p-4 shadow rounded bg-white"
          style={{ width: "340px" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-3">
            <FaUserCircle className="text-primary" size={70} />
            <h4 className="fw-bold mt-2">My Profile</h4>
          </div>
  
          <div className="mb-2 d-flex align-items-center">
            <FaUserTag className="text-secondary me-2" />
            <span className="text-dark"><strong>Name:</strong> {user.name} </span>
          </div>
  
          <div className="mb-2 d-flex align-items-center">
            <FaEnvelope className="text-secondary me-2" />
            <span className="text-dark"><strong>Email:</strong> {user.email} </span>
          </div>
  
          <div className="mb-2 d-flex align-items-center">
            <FaUserTag className="text-secondary me-2" />
            <span className="text-dark"><strong>Role:</strong> {user.role}</span>
          </div>
  
          <div className="mb-4 d-flex align-items-center">
            <FaCalendarAlt className="text-secondary me-2" />
            <span className="text-dark"><strong>Joined:</strong> june 2024</span>
          </div>
  
          <div className="d-flex justify-content-between">
            <Button onClick={logoutHandler} variant="outline-primary" size="sm">
              <FaPowerOff className="me-1" /> Logout
            </Button>
           { user.role!=="admin" ?(<Button variant="primary" size="sm" onClick={()=>navigate(`/account/course/study/${user._id}/dashboard`)} >
              <FaTachometerAlt className="me-1" /> Dashboard
            </Button>):
            
           ( <Button variant="primary" size="sm" onClick={()=>navigate(`/account/admin/dashboard`)} >
              <FaTachometerAlt className="me-1" />Admin Dashboard
            </Button>)}
          </div>
        </motion.div>
      </div>)
  }
    

   </>
  );
};

export default Account;
