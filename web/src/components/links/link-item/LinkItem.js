import {Link} from 'react-router-dom'


function LinkItem ({id, url, title, image, description, keywords}) {
    return(
        <Link exact to={id}>
        <div className="LinkItem">
            <div><img src={image} alt={title}/></div>
            <div>
                <h3>{title}</h3>
            </div>
        </div></Link>
    )
}

export default LinkItem

