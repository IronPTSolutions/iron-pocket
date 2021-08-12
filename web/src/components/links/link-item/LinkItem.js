import {Link} from 'react-router-dom';
import Moment from 'react-moment';



function LinkItem ({id, title, image, description, createdAt}) {
  
    return(
        <Link exact to={id}>
        <div className="LinkItem">
            <div>
                <img src={image} alt={title}/>
            </div>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <small><Moment fromNow>{createdAt}</Moment></small>
            </div>
        </div></Link>
    )
    
}

export default LinkItem

