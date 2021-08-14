import {Link} from 'react-router-dom';
import Moment from 'react-moment';



function LinkItem ({id, title, image, description, createdAt}) {
  
    return(
        
        <div className="LinkItem"><Link exact to={id} className="stretched-link" ></Link>
            <div>
                <img src={image} alt={title}/>
            </div>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <small><Moment fromNow>{createdAt}</Moment></small>
                
            </div> 
        </div>
       
    )
    
}

export default LinkItem

