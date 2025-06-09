import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";


const CourseContext = createContext()

export const  CourseContextProvider = ({children})=>{
     const [courses ,setCourses] = useState([])
     const [course,setCourse] = useState([])
       const [myCourse,setMyCourse] = useState([])
      
     async function fecthCourses() {
        try {
            const {data} = await axios.get(`${server}/api/course/all`)

            setCourses(data.courses)
        } catch (error) {
            console.log(error);
            
        }
     }
     async function fecthCourse(id) {
               try {
                const {data} = await axios.get(`${server}/api/course/${id}`)
                setCourse(data.course)
               } catch (error) {
                console.error("Failed to fetch course:", error.response?.data?.message || error.message);
                
               }        
     }
      async function fecthMyCourse() {
        const token = localStorage.getItem("token")
    try {
      const {data}= await axios.get(`${server}/api/mycourse`,
        {headers:{
          Authorization: `Bearer ${token}`
        }

        }
      )
      setMyCourse(data.courses)
    } catch (error) {
      console.log(error);
      
    }
  }    
  


       useEffect(()=>{
        fecthCourses()
        fecthMyCourse()
       },[])

    return <CourseContext.Provider value={{courses,fecthCourses,fecthCourse,course,fecthMyCourse,myCourse}}>{children} </CourseContext.Provider>
}

export const CourseData = ()=>useContext(CourseContext)