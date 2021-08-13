import http from './base-api-service';


// TODO: implement links service

const list = () => http.get('/links'); // .then(res => res.data) en el base-api-service

const details = (id) => http.get(`/links/${id}`);

const remove = (id) => http.delete(`/links/${id}`);

const create = (link) => http.post('/links', link)




const service = {
    list,
    details,
    remove,
    create

};

export default service;