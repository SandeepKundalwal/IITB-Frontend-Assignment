import React, { useState, useEffect } from 'react';
import { fetchCourses, deleteCourse } from '../services/CourseService';

function ShowCourses() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    async function fetchCoursesData() {
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            const response = await fetchCourses();
            const data = response.data.data.courses;

            if (data.length === 0) {
                setError('No courses found.');
            } else {
                setCourses(data);
            }
        } catch (err) {
            const errorMessage = "Error fetching courses: " + err.message;
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCoursesData();
    }, []);

    const handleDelete = (id) => {
        deleteCourse(id)
            .then(() => {
                setCourses(courses.filter(course => course.id !== id));
                setSuccessMessage('Course deleted successfully!');
            })
            .catch(error => {
                setError('Error deleting course: ' + error.message);
            });
    };

    const handleView = (course) => {
        setSelectedCourse(course);
    };

    const handleCloseModal = () => {
        setSelectedCourse(null);
    };

    return (
        <div className="show-courses">
            <h2>All Courses</h2>

            {loading && <p>Loading...</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <table>
                <thead>
                    <tr>
                        <th>Course Title</th>
                        <th>Code</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.length > 0 ? (
                        courses.map(course => (
                            <tr key={course.id}>
                                <td>{course.courseTitle}</td>
                                <td>{course.courseCode}</td>
                                <td>
                                    <button onClick={() => handleView(course)}>
                                        <i className="fa fa-search"></i>
                                    </button>
                                    <button onClick={() => handleDelete(course.id)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No courses available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedCourse && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>{selectedCourse.courseTitle}</h2>
                        <p><strong>Code:</strong> {selectedCourse.courseCode}</p>
                        <p><strong>Description:</strong> {selectedCourse.courseDescription}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowCourses;
