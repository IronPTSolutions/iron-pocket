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
                    this.props.history.push('/links');
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
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    )

    }


}

export default LinkDetails;