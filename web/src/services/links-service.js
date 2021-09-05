import http from './base-api-service';


// TODO: implement links service
const list = () => http.get('/links')
const details = (id) => http.get(`/links/${id}`)
const create = (link) => http.post(`/links`, link)
const remove = (id) => http.delete(`/links/${id}`)
const service = {
    list,
    details,
    create,
    remove
}

export default service