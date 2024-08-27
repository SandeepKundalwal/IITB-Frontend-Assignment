import React, { useState } from 'react';
import { createCourse } from '../services/CourseService';

function CreateCourse() {
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(undefined);
    const [description, setDescription] = useState('');

    function clearInputs(){
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
        }

        // Handle form submission (API call or form validation)
        createCourse(newCourse)
        .then(response => {
            console.log('Course created successfully:', response.data);
            // Clear form or handle success
            clearInputs();
            setStatus("success")
        })
        .catch(error => {
            console.error('Error creating course:', error)
            setStatus("error");
        });

            // console.log({ title, code, description });
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
            {status?.type === 'success' && <p>Course successfully created.</p>}
            {status?.type === 'error' && (
                <p>Error creating the course.</p>
            )}
        </div>


    </div>
  );
}

export default CreateCourse;
