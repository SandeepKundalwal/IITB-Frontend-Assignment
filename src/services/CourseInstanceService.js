import axios from 'axios';

const API_URL = "http://localhost:8080/api";

export const fetchCoursesByYearAndSemester = (year, semester) => {
    return axios.get(`${API_URL}/instances/${year}/${semester}`);
};

export const fetchCourseByCourseIdAndYearAndDate = (courseId, year, semester) => {
    return axios.get(`${API_URL}/instances/${year}/${semester}/${courseId}`);
};

export const createCourseInstance = (courseInstanceData) => {
    return axios.post(`${API_URL}/instances`, courseInstanceData);
};

export const deleteCourseInstance = (id) => {
    return axios.delete(`${API_URL}/instances/${id}`);
};