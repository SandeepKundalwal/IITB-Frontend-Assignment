import React, { useState, useEffect } from 'react';
import { fetchCourses, deleteCourse } from '../services/CourseService';

function ShowCourses() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    async function fetchCoursesData() {
        
        try {
            const response = await fetchCourses();
            const data = response.data.data.courses;

            // for(let i = 0; i < data.length; i++){
            //     const id = data[i].id;
            //     const courseCode = data[i].courseCode;
            //     const courseTitle = data[i].courseTitle;
            //     const courseDescription = data[i].courseDescription;

            //     console.log(id + " " + courseCode + " " + courseTitle + " " + courseDescription);
            // }

            setCourses(data);
        } catch (err) {
            const errorMessage = "Error: " + err.message;
            setError(errorMessage);
        }
    }

    useEffect(() => {
      fetchCoursesData();
    }, []);
  
    const handleDelete = (id) => {
      deleteCourse(id)
        .then(() => {
          setCourses(courses.filter(course => course.id !== id));
        })
        .catch(error => console.error('Error deleting course:', error));
    };

  return (
    <div className="show-courses">
      <h2>All Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {courses.map(course => (
                <tr key={course.id}>
                <td>{course.courseTitle}</td>
                <td>{course.courseCode}</td>
                <td>
                    <button onClick={() => console.log(`View course ${course.id}`)}>
                    <i className="fa fa-search"></i>
                    </button>
                    <button onClick={() => handleDelete(course.id)}>
                    <i className="fa fa-trash"></i>
                    </button>
                </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowCourses;
