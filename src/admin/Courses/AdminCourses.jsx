import React, { useEffect, useState } from 'react'
import Layout from '../Utils/Layout'
import { useNavigate } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'
import CourseCard from '../../components/couresecard/CourseCard'
import toast from 'react-hot-toast'
import axios from 'axios'
import { server } from '../../main'
import { Container, Row, Col, Form, Button, Image, Card } from 'react-bootstrap'

const categories = [
    "Web development",
    "App development",
    "Game Development",
    "Data Science",
    "A.I"
]

function AdminCourses({user}) {
    const navigate = useNavigate()
    if (user && user.role !== "admin") {
        return navigate('/')
    }
    const { courses, fetchCourses } = CourseData()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [createdBy, setCreatedBy] = useState("")
    const [duration, setDuration] = useState("")
    const [image, setImage] = useState("")
    const [imagePrev, setImagePrev] = useState("")
    const [btnLoading, setBtnLoading] = useState(false)

    const changeImageHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setImagePrev(reader.result)
            setImage(file)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setBtnLoading(true)

        const myForm = new FormData()
        const token = localStorage.getItem("token")

        myForm.append("title", title)
        myForm.append("description", description)
        myForm.append("category", category)
        myForm.append("price", price)
        myForm.append("createdBy", createdBy)
        myForm.append("duration", duration)
        myForm.append("file", image)

        try {
            const { data } = await axios.post(`${server}/api/course/new`, myForm, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(data.message)
            setBtnLoading(false)
            fetchCourses()
            setTitle("")
            setDescription("")
            setCategory("")
            setCreatedBy("")
            setDuration("")
            setPrice("")
            setImage("")
            setImagePrev("")

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    

    return (
        <Layout>
            <Container fluid className="py-4">
                <Row>
                    <Col md={8}>
                        <h2 className="mb-3">All Courses</h2>
                        <Row>
                            {courses && courses.length > 0 ? courses.map((e) => (
                                <Col key={e._id} sm={12} md={6} lg={4} className="mb-4">
                                    <CourseCard course={e} />
                                </Col>
                            )) : <p>No Courses Yet</p>}
                        </Row>
                    </Col>

                    <Col md={4}>
                        <Card className="p-3 shadow-lg">
                            <h4 className="text-center mb-3 text-primary">Add Course</h4>
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Created By</Form.Label>
                                    <Form.Control type="text" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
                                        <option value="">Select Category</option>
                                        {categories.map(e => <option key={e} value={e}>{e}</option>)}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Upload Image</Form.Label>
                                    <Form.Control type="file" accept="image/*" onChange={changeImageHandler} required />
                                </Form.Group>

                                {imagePrev && (
                                    <div className="text-center mb-2">
                                        <Image src={imagePrev} fluid rounded width={200} />
                                    </div>
                                )}

                                <Button variant="primary" type="submit"  disabled={btnLoading} className="w-100">
                                    {btnLoading ? "Please Wait..." : "Add"}
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default AdminCourses
