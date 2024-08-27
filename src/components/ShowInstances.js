import React, { useState, useEffect } from 'react';

function ShowInstances() {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [instances, setInstances] = useState([]);

  const handleListInstances = () => {
    // Fetch the list of course instances for the selected year and semester
    fetch(`http://localhost:8080/api/instances/${year}/${semester}`) // Adjust API as necessary
      .then(response => response.json())
      .then(data => setInstances(data))
      .catch(error => console.error('Error fetching instances:', error));
  };

  const handleDelete = (id) => {
    // API call to delete a course instance
    fetch(`http://localhost:8080/api/instances/${year}/${semester}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Update state to reflect the deleted instance
        setInstances(instances.filter(instance => instance.id !== id));
      })
      .catch(error => console.error('Error deleting instance:', error));
  };

  return (
    <div className="show-instances">
      <h2>Course Instances</h2>

      {/* Filters: Year and Semester */}
      <div className="filters">
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="">Select semester</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <button onClick={handleListInstances}>List instances</button>
      </div>

      {/* Course Instances Table */}
      <table>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Year-Sem</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {instances.map(instance => (
            <tr key={instance.id}>
              <td>{instance.course.title}</td>
              <td>{instance.year}-{instance.semester}</td>
              <td>{instance.course.code}</td>
              <td>
                <button onClick={() => console.log(`View instance ${instance.id}`)}>
                  <i className="fa fa-search"></i>
                </button>
                <button onClick={() => handleDelete(instance.id)}>
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

export default ShowInstances;
