import http from './base-api-service';

const list = () => http.get('/links')

const service = {
    list
}

export default service