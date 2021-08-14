import {Link} from 'react-router-dom';
import Moment from 'react-moment';



function LinkItem ({id, title, image, description, createdAt, updatedAt}) {
  
    return(
        
        <div className="LinkItem">
            <div>
                <img src={image} alt={title}/>
            </div>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <small>Created <Moment fromNow>{createdAt}</Moment></small> {createdAt !== updatedAt && <small> | Last updated <Moment fromNow>{updatedAt}</Moment></small>}             
            </div> <Link exact to={id} className="stretched-link" />
        </div>
       
    )
    
}

export default LinkItem

