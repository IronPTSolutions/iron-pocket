import { Link } from 'react-router-dom'
import React from 'react'
import './LinkItem.css'
import Moment from 'react-moment';

function LinkItem({ id, title, description, image, createdAt, onDeleteLink }) {
    return (
        <div className="card">
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text text-muted"><small>Created <Moment fromNow>{createdAt}</Moment></small></p>
                <Link to={`/links/${id}`} className="stretched-link" />
            </div>
            <div className="me-2 mt-2 delete">
                <i className="fa fa-trash-o text-danger mr-2" role="button" onClick={() => onDeleteLink(id)} />
            </div>
        </div>
    )
}
export default LinkItem