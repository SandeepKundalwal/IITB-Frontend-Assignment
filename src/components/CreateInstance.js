import React, { useState, useEffect } from 'react';

function CreateInstance() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');

  useEffect(() => {
    // Fetch the list of courses from the backend to populate the dropdown
    fetch('http://localhost:8080/api/courses')  // Adjust API endpoint if needed
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleSubmit = (e) => {
    // e.preventDefault();
    // // Handle form submission (API call to create a new instance)
    // const instanceData = {
    //   course_id: selectedCourseId,
    //   year: year,
    //   semester: semester
    // };

    // fetch('http://localhost:8080/api/instances', {  // Adjust API endpoint if needed
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(instanceData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
  };

  return (
    <div className="create-instance">
      <h2>Create Course Instance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Course</label>
          <select 
            value={selectedCourseId} 
            onChange={(e) => setSelectedCourseId(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => window.location.reload(false)}>Refresh</button>
        </div>
        <div>
          <label>Year</label>
          <input 
            type="number" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            placeholder="Year" 
            required 
          />
        </div>
        <div>
          <label>Semester</label>
          <input 
            type="number" 
            value={semester} 
            onChange={(e) => setSemester(e.target.value)} 
            placeholder="Semester" 
            required 
          />
        </div>
        <button type="submit">Add Instance</button>
      </form>
    </div>
  );
}

export default CreateInstance;
