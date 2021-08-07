import http from './base-api-service';

const list = () => http.get('/links')

const details = (id) => http.get(`/links/${id}`)

const create = (link) => http.post(`/links`, link)

const remove = (id) => http.delete(`/links/${id}`)

const update = (link) => http.put(`/links/${link.id}`, link)

const service = {
  create,
  update,
  remove,
  list,
  details
}

export default service;
