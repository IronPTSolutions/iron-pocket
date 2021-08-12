import http from './base-api-service';


// TODO: implement links service

const list = () => http.get('/links'); // .then(res => res.data) en el base-api-service
// const remove = (id) => http.delete(`/links/${id}`);
const details = (id) => http.get(`/links/${id}`);


const service = {
    list,
    details

};

export default service;