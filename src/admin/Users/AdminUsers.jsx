import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { server } from '../../main'
import Layout from '../Utils/Layout'
import toast from 'react-hot-toast'
import { Table, Container, Button, Row, Col, Card } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { UserCog } from 'lucide-react'

function AdminUsers({user}) {
    const navigate = useNavigate()
    if (user && user.role !== "admin") {
        return navigate('/')
    }
    const [users,setUsers]=useState([])

    async function fecthUsers() {
        const token = localStorage.getItem("token")
        try {
            const {data} = await axios.get(`${server}/api/users`,{
                headers:{
                 Authorization: `Bearer ${token}`
                }
            })
            setUsers(data.users)
        } catch (error) {
            console.log(error);
            
        }

    }
    useEffect(()=>{
        fecthUsers()
    },[])
    const updateRole = async(id)=>{
        if (confirm("are you sure you want to update this role")) {
            const token = localStorage.getItem("token")
            try {
                const {data} = await axios.put(`${server}/api/user/${id}`,{},{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                toast.success(data.message)
                fecthUsers()
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message)
                
            }
        }
    }
    
  return (
    <Layout>
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-primary fw-bold"
          >
            <UserCog className="me-2" /> Manage Users
          </motion.h1>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover bordered className="text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Update Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((e, i) => (
                <motion.tr
                  key={e._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td className="text-break">{e.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        e.role === 'admin' ? 'bg-success' : 'bg-secondary'
                      }`}
                    >
                      {e.role}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      onClick={() => updateRole(e._id)}
                      className="px-3 py-1"
                    >
                      Update Role
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  </Layout>
  )
}

export default AdminUsers