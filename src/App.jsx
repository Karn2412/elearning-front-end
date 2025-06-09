
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Verify from './pages/Auth/Verify';
import About from './pages/About/About';
import Account from './pages/account/Account';
import Header from './components/Header';
import Footer from './components/Footer';
import { UserData } from './context/Context';
import Courses from './pages/courses/Courses';
import CourseDiscription from './pages/CourseDiscription/CourseDiscription';
import PaymentSuccess from './pages/paymentsuccess/PaymentSuccess';
import Dashboard from './pages/dashboard/Dashboard';
import CourseStudy from './pages/coursestudy/CourseStudy';
import Lectures from './pages/lectures/Lectures';
import AdminDashboard from './admin/Dashboard/AdminDashboard';
import AdminCourses from './admin/Courses/AdminCourses';
import AdminUsers from './admin/Users/AdminUsers';


function App() {
 const {isAuth ,user} = UserData() 

  return (
    <>
    <BrowserRouter>
    <Header isAuth ={isAuth} />
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/login' element={isAuth? <Home/>: <Login/>}/>
     <Route path='/register' element={isAuth?<Home/>: <Register/>}/>
     <Route path='/verify' element={isAuth?<Home/> : <Verify/>}/>
     <Route path='/course/:id' element={isAuth?<CourseDiscription user={user}/> : <Login/>}/>
     <Route path='/about' element={<About/>}/>
     <Route path='/courses' element={<Courses/>}/>
     <Route path='/account' element={isAuth?<Account user={user}/> :<Login/>}/>
     <Route path='/payment-success/:id' element={isAuth?<PaymentSuccess user={user}/>:<Login/>}/>
     <Route path='/account/course/study/:id/dashboard' element={isAuth?<Dashboard user={user}/>:<Login/>}/>
     <Route path='/course/study/:id' element={isAuth?<CourseStudy user={user}/>:<Login/>}/>
     <Route path='/study/:id' element={isAuth?<Lectures user={user}/>:<Login/>}/>
     <Route path='/account/admin/dashboard' element={isAuth?<AdminDashboard user={user}/>:<Login/>}/>
     <Route path='/account/admin/course' element={isAuth?<AdminCourses user={user}/>:<Login/>}/>
     <Route path='/account/admin/users' element={isAuth?<AdminUsers user={user}/>:<Login/>}/>


    </Routes>
    <Footer/>
    </BrowserRouter>
      
    </>
  )
}

export default App
