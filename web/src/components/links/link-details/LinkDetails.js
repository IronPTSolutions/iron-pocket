
import { Component } from 'react';
import { Link } from 'react-router-dom';
import linkService from '../../../services/links-service';

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
            .then(() => this.props.history.push('/'))
            .catch()
    }


    render(){
        const {link} = this.state;
        document.title = link.title;
        document.description = link.description;
        
        
    return(
        <div className="container col-9 row">
            <div className="col-4"><img src={link.image} alt={link.title} /></div>
            <div className="col-5">
                <h1>{link.title}</h1>
                <p>{link.description}</p>
                <h6>{link.keywords.map(keyword => `#${keyword}`)}</h6>
          
            </div>
            <div className="col-3">
                <ul>
                <li><a href={link.url} target="_blank"><i class="fas fa-link"></i> Visit link</a></li>
                <li><Link to={`${link.id}/edit`}><i class="far fa-edit"></i> edit link</Link></li>
                <li><a href="#" onClick={() => this.handleDeleteLink(link.id)}><i class="far fa-trash-alt"></i> Delete link</a></li>
                </ul>
            </div>
        </div>
    )}
}

export default LinkDetail