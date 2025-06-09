import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../main';
import { Button, Spinner, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { VideoIcon, Trash2, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

function Lectures({ user }) {
    const params = useParams();
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate('/')
  }


  const fetchLectures = async () => {
    const token = localStorage.getItem('token');
    console.log(params.id);
    
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLectures(data.lectures);
    } catch (error) {
      toast.error('Failed to load lectures');
    } finally {
      setLoading(false);
    }
  };

  const fetchLecture = async (id) => {
    const token = localStorage.getItem('token');
    
    setLecLoading(true);
    try {

      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLecture(data.lecture);
    } catch (error) {
      toast.error('Error loading lecture');
    } finally {
      setLecLoading(false);
    }
  };

  const changeVideoHandler = e =>{
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = ()=>{
      setVideoPrev(reader.result)
      setVideo(file)
    }
  }


   const submitHandler = async(e)=>{
    setBtnLoading(true);
    e.preventDefault()
    const myFrom =new FormData()
    myFrom.append("title",title)
    myFrom.append("description",description)
    myFrom.append("file",video)
     const token = localStorage.getItem('token');
    try {
      const {data} = await axios.post(`${server}/api/course/${params.id}`,myFrom,{
        headers:
        { Authorization: `Bearer ${token}` },
      })
      toast.success(data.message)
      setBtnLoading(false)
      setShow(false)
      fetchLectures()
      setTitle("")
      setDescription("")
      setVideo("")
      setVideoPrev("")
      
    } catch (error) {
      toast.error(error.response.data.message)
      setBtnLoading(false)
    }
   }
   const deleteHandler =async(id)=>{
    if (confirm("Are you Sure you want to delete the lecture")) {
           const token = localStorage.getItem('token');

      try {
        const {data} = await axios.delete(`${server}/api/lecture/${id}`,{
          headers:{
              Authorization: `Bearer ${token}`  
          }
        })
        toast.success(data.message)
        fetchLectures()
       } catch (error) {
        toast.error(error.response.data.message)
      }
    }
   }
  useEffect(() => {
    if (params) {
        fetchLectures(params);
    }
  }, [params]);

  

  return (
    <Container fluid className='p-3'>
      <Row>
        <Col md={8} className='mb-3'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            {lecLoading ? (
              <Spinner animation='border' />
            ) : lecture.video ? (
              <>
                <video
                  src={`${server}/${lecture.video}`}
                  width='100%'
                  controls
                  controlsList='nodownload noremoteplayback'
                  disablePictureInPicture
                  disableRemotePlayback
                  autoPlay
                />
                <h2 className='mt-3'>{lecture.title}</h2>
                <p>{lecture.description}</p>
              </>
            ) : (
              <div style={{height:"380px"}}><h4>Please select a lecture</h4></div>
            )}
          </motion.div>
        </Col>

        <Col md={4}>
          <div className='d-flex justify-content-between align-items-center mb-2'>
            <h5 className='mb-0'>Lectures</h5>
            {user && user.role === 'admin' && (
              <Button disabled={btnLoading} variant='outline-primary' size='sm' onClick={() => setShow(!show)}>
                <PlusCircle size={16} className='me-1' /> {btnLoading?"Please wait...":"Add"}
              </Button>
            )}
          </div>

          {show && (
            <Card className='mb-3'>
              <Card.Body>
                <Form  onSubmit={submitHandler}>
                  <Form.Group className='mb-2'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type='text'
                      required
                      value={title}
                      onChange={(e)=>setTitle(e.target.value)}
                     
                    />
                  </Form.Group>
                  <Form.Group className='mb-2'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type='text'
                      required
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Video File</Form.Label>
                    <Form.Control
                      type='file'
                      required
                      onChange={changeVideoHandler}


                    />

                    {
                      videoPrev && <video src={videoPrev} alt='' width={300} controls></video>
                    }
                  </Form.Group>
                  <Button type='submit' variant='success'>Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          <div>
            {loading ? (
              <Spinner animation='border' />
            ) : lectures.length > 0 ? (
              lectures.map((e, i) => (
                <motion.div
                  key={e._id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => fetchLecture(e._id)}
                  className='p-2 mb-2 border rounded bg-light d-flex justify-content-between align-items-center cursor-pointer'>
                  <span><VideoIcon size={16} className='me-2' /> {i + 1}. {e.title}</span>
                  {user?.role === 'admin' && (
                    <Button variant='danger' size='sm'onClick={()=>deleteHandler(e._id)} >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  )}
                </motion.div>
              ))
            ) : (
              <p>No lectures yet</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Lectures;
