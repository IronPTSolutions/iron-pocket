import moment from 'moment'
import { Link } from 'react-router-dom'
function LinkItem({ title, image, keywords, description, id, createdAt }) {
    return (
        <div className="card mb-3">
            <div className="row g-1">
            
                <div className="col-md-2">
                    <img src={image} className="w-100 h-100" styles={{ objectFit: 'contain' }} alt={title} />
                </div>

                <div className="col-md-10" >
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"> <small className="text-muted"> {moment(createdAt).fromNow()} </small></p>
                        <Link to={`/links/${id}`} className="stretched-link" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LinkItem