import React from 'react'
import './LinkItem.css'
import Moment from 'react-moment';

function LinkItem({ title, description, image, createdAt }) {
    return (
        <div className="card">
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text text-muted"><small>Created <Moment fromNow>{createdAt}</Moment></small></p>

            </div>
        </div>
    )
}
export default LinkItem