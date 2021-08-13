import { Component } from 'react';

import linkService from '../../../services/links-service';

class LinkDetails extends Component {

    state = {
        link: null
    }


    componentDidMount() {
        const id = this.props.match?.params?.id;
        linkService.details(id)
            .then(link => this.setState({ link }))
            .catch(error => {
                console.error(error);
                if (error.response?.status === 404) {
                    this.props.history.push('/404');
                }
            })
    }

    handleRemove() {
        const id = this.props.match?.params?.id;
        linkService.remove(id)
            .then(link => this.props.onDeleteLink(link),
            this.props.history.push('/links'))
            .catch(error => {
                console.error(error);
                if (error.response?.status === 404) {
                    this.props.history.push('/404');
                }
            })

    }

    render() {
    const { link } = this.state;
    return link && (
        <div className="container p-5">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src={link.image} style={{maxWidth: "320px"}} className="img-fluid rounded-start" alt={link.title}/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{link.title}</h5>
                        <p className="card-text">{link.description}</p>
                        <div className="col-12">
                            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button className="btn btn-primary" href="/links">
                                    <i className="fa fa-edit"></i>
                                </button>
                                <a type="button" className="btn btn-secondary" href={link.url} target="_blank" rel="noopener noreferrer">
                                    <i className="fa fa-eye"></i>
                                </a>
                                <button className="btn btn-danger" onClick={() => this.handleRemove()}>
                                    <i className="fa fa-times"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    )

    }

}

LinkDetails.defaultProps = {
    onDeleteLink: () => {}
}

export default LinkDetails;