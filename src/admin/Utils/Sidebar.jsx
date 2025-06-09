import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, User, PowerCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import './Sidebar.css'

function Sidebar() {
  const location = useLocation();

  return (
    <motion.div 
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="d-flex flex-column bg-white shadow-sm vh-100 p-3 sidebar"
    >
      
      
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <Link 
            to="/account/admin/dashboard"
            className={`nav-link d-flex align-items-center gap-2 ${location.pathname === "/account/admin/dashboard" ? "active" : "text-dark"}`}
          >
            <Home />
            <span>Home</span>
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link 
            to="/account/admin/course"
            className={`nav-link d-flex align-items-center gap-2 ${location.pathname === "/account/admin/course" ? "active" : "text-dark"}`}
          >
            <BookOpen />
            <span>Courses</span>
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link 
            to="/account/admin/users"
            className={`nav-link d-flex align-items-center gap-2 ${location.pathname === "/account/admin/users" ? "active" : "text-dark"}`}
          >
            <User />
            <span>Users</span>
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link 
            to="/account" // change this to actual logout path or function
            className="nav-link d-flex align-items-center gap-2 text-danger"
          >
            <PowerCircle />
            <span>Logout</span>
          </Link>
        </li>
      </ul>

      
    </motion.div>
  );
}

export default Sidebar;
