import http from './base-api-service';

const list = () => http.get('/links');

const create = (link) => http.post('/links', link);

const detail = (id) => http.get(`/links/${id}`);

const remove = (id) => http.delete(`/links/${id}`);

//const edit = (id) => http.put(`/links/${id}`);

const service = {
    list, 
    create,
    detail,
    remove,
    //edit
};

export default service;
