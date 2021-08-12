import http from './base-api-service';

const list = () => http.get('/links');
const detail = (id) => http.get(`/links/${id}`);
const remove = (id) => http.delete(`/links/${id}`);
const create = (link) => http.post('links', link);
const edit = (id, link) => http.put(`/links/${id}`, link)

const service = {
    list,
    detail,
    remove,
    create,
    edit
}

export default service

// TODO: implement links service
