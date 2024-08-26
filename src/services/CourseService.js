import axios from 'axios';

const API_URL = "http://localhost:8080/api";

export const fetchCourses = () => {
    return axios.get(`${API_URL}/courses`);
};

export const fetchCourseById = (courseId) => {
    return axios.get(`${API_URL}/courses/${courseId}`);
};

export const createCourse = (courseData) => {
    return axios.post(`${API_URL}/courses`, courseData);
};

export const deleteCourse = (courseId) => {
    return axios.delete(`${API_URL}/courses/${courseId}`);
};