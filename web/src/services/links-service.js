import http from './base-api-service';


// TODO: implement links service
const list = () => http.get('/links')
const details = (id) => http.get(`/links/${id}`)



const service = {
    list,
    details

}

export default service