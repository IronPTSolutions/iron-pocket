import http from './base-api-service';


// TODO: implement links service
const list = () => http.get('/links')
const details = (id) => http.get(`/links/${id}`)

const create = (link) => http.post(`/links`, link)
const service = {
    list,
    details,
    create,
}

export default service