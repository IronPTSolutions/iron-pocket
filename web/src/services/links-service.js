import http from './base-api-service';

const list = () => http.get('/links')
const create = (link) => http.post('/links', link)
const remove = (id) => http.delete(`links/${id}`)
const details = (id) => http.get(`links/${id}`)

const service = {
    list,
    create, 
    remove, 
    details
}

export default service