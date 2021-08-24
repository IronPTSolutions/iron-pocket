import { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import linkService from '../../../services/links-service';

class LinkDetail extends Component {
    state = {
        link: {
            id: '',
            url: '',
            title: '',
            description: '',
            image: '',
            keywords: []
        }
    }
        
    componentDidMount() {
        const id = this.props.match?.params?.id;
        linkService.detail(id)
            .then(link => this.setState({ link }))
            .catch(error => {
                console.error(error);
                if(error.response?.status === 404) {
                    this.props.history.push('/');
                }
            })
    }

    handleDeleteLink(id) {
        linkService.remove(id)
            .then(() => this.props.history.push('/'))
            .catch(error => {
                console.error(error);
            })
    }

    render() {
        const { link } = this.state;
        return link && (
            <div className="container py-5">
            <div className="row mb-3">
                <div className="col-6">
                    <img src={link.image} alt={link.title} className="img-fluid"/>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h1>{link.title}</h1>
                    <p>{link.description}</p>
                </div>
                <div className="col-12">
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <Link role="button" className="btn btn-primary" to={`/${link.id}/edit`}><i className="fa fa-edit"></i></Link>
                        <a type="button" className="btn btn-secondary" href={link.url} target="_blank" rel="noopener noreferrer"><i className="fa fa-eye"></i></a>
                        <button type="button" className="btn btn-danger" onClick={() => this.handleDeleteLink(link.id)}><i className="fa fa-times"></i></button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default LinkDetail;