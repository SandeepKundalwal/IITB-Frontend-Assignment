import React, { useState, useEffect } from 'react';
import { createCourseInstance } from '../services/CourseInstanceService';
import { fetchCourses } from '../services/CourseService';

function CreateInstance() {
    const [status, setStatus] = useState({ type: '', message: '' });
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    function clearInputs() {
        setYear('');
        setSemester('');
        setSelectedCourseId('');
    }

    async function fetchCoursesData() {
        try {
            const response = await fetchCourses();
            const data = response.data.data.courses;
            setCourses(data);
        } catch (err) {
            const errorMessage = "Error: " + err.message;
            setError(errorMessage);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCourseInstance = {
            course_id: selectedCourseId,
            year: year,
            semester: semester,
        };

        console.log(`${selectedCourseId} ${year} ${semester}`);

        createCourseInstance(newCourseInstance)
            .then(response => {
                console.log('Course Instance created successfully:', response.data);
                clearInputs();
                setStatus({ type: 'success', message: 'Course instance successfully created.' });
            })
            .catch(error => {
                console.error('Error creating course instance:', error);

                if (error.response && error.response.status === 400) {
                    setStatus({ type: 'error', message: 'Validation error: Please check the input fields or exact instance already exists.' });
                } else if (error.response && error.response.status === 500) {
                    setStatus({ type: 'error', message: 'Server error: Please try again later.' });
                } else {
                    setStatus({ type: 'error', message: 'An unexpected error occurred. Please try again.' });
                }
            });
    };

    useEffect(() => {
        fetchCoursesData();
    }, []);

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
                                [{course.courseCode}] - {course.courseTitle}
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

            <div>
                {status.type === 'success' && <p style={{ color: 'green' }}>{status.message}</p>}
                {status.type === 'error' && <p style={{ color: 'red' }}>{status.message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}

export default CreateInstance;
