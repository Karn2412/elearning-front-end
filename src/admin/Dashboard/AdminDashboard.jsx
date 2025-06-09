import React, { useEffect } from 'react'
import Layout from '../Utils/Layout'
import axios from "axios";
import { server } from "../../main";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaVideo, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



function AdminDashboard({user}) {
     const navigate = useNavigate()
    if (user&&user.role !=="admin") {
        return navigate('/')
    }
    
 const [stats, setStats] = useState([])

  async function fetchStats() {
    const token = localStorage.getItem("token");
  try {
    const {data} = await axios.get(`${server}/api/stats`,{
      headers:
      {Authorization:`Bearer ${token}`}
    })

    setStats(data.stats)
    
    
    
  } catch (error) {
    console.log(error);
    
  }
  
  
 }
 useEffect(()=>{
  fetchStats()
 },[])
 
    
   
  return (
    
  <Layout>
  <div className="container py-4 ">
    <h2 className="mb-5 text-center fw-bold">📊 Admin Dashboard</h2>
    
    <div className="row g-4 justify-content-center">
      
      {/* Total Courses */}
      <div className="col-md-4">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.98 }} 
          className="card shadow-lg border-0 text-white bg-primary rounded-4 p-4 h-100"
        >
          <div className="d-flex align-items-center gap-3">
            <FaBook size={30} />
            <h5 className="card-title mb-0">Total Courses</h5>
          </div>
          <h3 className="display-6 mt-3">{stats.totalCourses ?? 0}</h3>
        </motion.div>
      </div>

      {/* Total Lectures */}
      <div className="col-md-4">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.98 }} 
          className="card shadow-lg border-0 text-white bg-success rounded-4 p-4 h-100"
        >
          <div className="d-flex align-items-center gap-3">
            <FaVideo size={30} />
            <h5 className="card-title mb-0">Total Lectures</h5>
          </div>
          <h3 className="display-6 mt-3">{stats.totalLectures ?? 0}</h3>
        </motion.div>
      </div>

      {/* Total Users */}
      <div className="col-md-4">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.98 }} 
          className="card shadow-lg border-0 text-white bg-warning rounded-4 p-4 h-100"
        >
          <div className="d-flex align-items-center gap-3">
            <FaUsers size={30} />
            <h5 className="card-title mb-0">Total Users</h5>
          </div>
          <h3 className="display-6 mt-3">{stats.totalUsers ?? 0}</h3>
        </motion.div>
      </div>

    </div>
  </div>
  </Layout>
 


  )
}

export default AdminDashboard