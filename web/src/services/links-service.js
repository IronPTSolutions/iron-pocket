import http from './base-api-service';

const list = () => http.get('/links');

const detail = (id) => http.get(`/links/${id}`);

const remove = (id) => http.delete(`/links/${id}`);

const service = {
    list, 
    detail,
    remove,
};

export default service;
