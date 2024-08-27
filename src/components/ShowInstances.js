import React, { useState } from 'react';
import { fetchCoursesByYearAndSemester, deleteCourseInstance } from '../services/CourseInstanceService';

function ShowInstances() {
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [instances, setInstances] = useState([]);
    const [selectedInstance, setSelectedInstance] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    async function fetchAllCoursesInstancesData() {
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        if (!year || !semester) {
            setError('Year and Semester are required to fetch course instances.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetchCoursesByYearAndSemester(year, semester);
            const data = response.data.data["course-instances"];

            if (data.length === 0) {
                setError(`No course instances found for year ${year} and semester ${semester}.`);
            } else {
                setInstances(data);
                setError(null);
            }
        } catch (err) {
            setError(`Error fetching course instances: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = (id) => {
        deleteCourseInstance(id)
            .then(() => {
                setInstances(instances.filter(instance => instance.courseInstanceId !== id));
                setSuccessMessage('Course instance deleted successfully!');
            })
            .catch(error => {
                setError('Error deleting instance: ' + error.message);
            });
    };

    const handleView = (instance) => {
        setSelectedInstance(instance);
    };

    const handleCloseModal = () => {
        setSelectedInstance(null);
    };

    return (
        <div className="show-instances">
            <h2>Course Instances</h2>

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
                <button onClick={fetchAllCoursesInstancesData}>List instances</button>
            </div>

            {loading && <p>Loading...</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

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
                    {instances.length > 0 ? (
                        instances.map(instance => (
                            <tr key={instance.courseInstanceId}>
                                <td>{instance.course.courseTitle}</td>
                                <td>{instance.year}-{instance.semester}</td>
                                <td>{instance.course.courseCode}</td>
                                <td>
                                    <button onClick={() => handleView(instance)}>
                                        <i className="fa fa-search"></i>
                                    </button>
                                    <button onClick={() => handleDelete(instance.courseInstanceId)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No course instances available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedInstance && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>{selectedInstance.course.courseTitle}</h2>
                        <p><strong>Code:</strong> {selectedInstance.course.courseCode}</p>
                        <p><strong>Description:</strong> {selectedInstance.course.courseDescription}</p>
                        <p><strong>Year:</strong> {selectedInstance.year}</p>
                        <p><strong>Semester:</strong> {selectedInstance.semester}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowInstances;
