import React, { useState } from 'react';
import { createCourse } from '../services/CourseService';

function CreateCourse() {
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });

    function clearInputs() {
        setCode('');
        setTitle('');
        setDescription('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCourse = {
            code: code,
            title: title,
            description: description,
        };

        createCourse(newCourse)
            .then(response => {
                console.log('Course created successfully:', response.data);
                clearInputs();
                setStatus({ type: 'success', message: 'Course successfully created.' });
            })
            .catch(error => {
                console.error('Error creating course:', error);
                
                if (error.response && error.response.status === 400) {
                    setStatus({ type: 'error', message: 'Validation error: Please check the input fields or the course code already exists.' });
                } else if (error.response && error.response.status === 500) {
                    setStatus({ type: 'error', message: 'Server error: Please try again later.' });
                } else {
                    setStatus({ type: 'error', message: 'An unexpected error occurred. Please try again.' });
                }
            });
    };

    return (
        <div className="create-course">
            <h2>Create Course</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Course Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Course title" 
                        required 
                    />
                </div>
                
                <div>
                    <label>Course Code</label>
                    <input 
                        type="text" 
                        value={code} 
                        onChange={(e) => setCode(e.target.value)} 
                        placeholder="Course code" 
                        required 
                    />
                </div>

                <div>
                    <label>Course Description</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Course description" 
                        required 
                    />
                </div>
                
                <button type="submit">Add course</button>
            </form>

            <div>
                {status.type === 'success' && <p style={{ color: 'green' }}>{status.message}</p>}
                {status.type === 'error' && <p style={{ color: 'red' }}>{status.message}</p>}
            </div>
        </div>
    );
}

export default CreateCourse;
