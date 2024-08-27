import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateCourse from './components/CreateCourse';
import CreateInstance from './components/CreateInstance';
import ShowCourses from './components/ShowCourses';
import ShowInstances from './components/ShowInstances';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li><Link to="/create-course">Create Course</Link></li>
            <li><Link to="/create-instance">Create Instance</Link></li>
            <li><Link to="/show-courses">Show All Courses</Link></li>
            <li><Link to="/show-instances">Show Instances</Link></li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/create-instance" element={<CreateInstance />} />
          <Route path="/show-courses" element={<ShowCourses />} />
          <Route path="/show-instances" element={<ShowInstances />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;