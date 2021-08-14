
import { Component } from 'react';
import { Link } from 'react-router-dom';
import linkService from '../../../services/links-service';
import Moment from 'react-moment';

class LinkDetail extends Component {

    state = {
       link: {
           id: '',
           url: '',
           title: '',
           image: '',
           description: '',
           keywords: []
        }        
    }

    componentDidMount(){
        linkService.detail(this.props.match.params.id)
            .then(link => this.setState({link}))
            .catch(error => {
                console.error(error);
                if (error.response?.status === 404) {
                  this.props.history.push('/404');
                }
              });
  
    }

    handleDeleteLink(id){
        linkService.remove(id)
            .then(() => this.props.history.push('/links'))
            .catch()
    }


    render(){
       
        const {link} = this.state;
        document.title = link.title;
        document.description = link.description;        
        
    return(
        <div className="container col-9 row LinkDetail">
            <div className="col-9">                
                <img src={link.image} alt={link.title} />           
            </div>
            <div className="col-3 side-bar"> 
            <div >
                <small><Moment fromNow>{link.createdAt}</Moment></small>
                <h1>{link.title}</h1>
                <p>{link.description}</p>
                {link.keywords && <h6>{link.keywords.map(keyword => `#${keyword}`)}</h6>}            
            </div>
                <ul>
                    <li><a href={link.url} target="_blank" rel="noreferrer"><i className="fas fa-link"></i> Visit link</a></li>
                    <li><Link to={`${link.id}/edit`}><i className="far fa-edit"></i> edit link</Link></li>
                    <li><i className="far fa-trash-alt stretched-link" role="button" onClick={() => this.handleDeleteLink(link.id)}></i> Delete link</li>
                </ul>
            </div>
        </div>
    )}
}

export default LinkDetail