import http from './base-api-service';

const list = () => http.get('/links')
const create = (link) => http.post('/links', link)

const service = {
    list,
    create
}

export default service