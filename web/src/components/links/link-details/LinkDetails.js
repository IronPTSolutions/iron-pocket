import React from 'react'
import linksService from '../../../services/links-service'

class LinkDetails extends React.Component {
    state = {
        link: null
    }

    componentDidMount() {
        const id = this.props.match?.params?.id
        linksService.details(id)
            .then(link => this.setState({ link }))
            .catch(error => {
                console.error(error);
                if (error.response?.status === 404) {
                    this.props.history.push('/404');
                }
            })
    }
    render() {
        const { link } = this.state
        return (
            link && (
                <>
                <div className="container d-flex row justify-content-center">
                    <div className="col-md-5">
                        <img className="img-thumbnail rounded mx-auto d-block" src={link.image} alt="article" />
                    </div>
                    <h3>{link.title}</h3>
                    <div><small>{link.description}</small></div>
                    <a href={link.url} role="button" target="_blank" rel="noreferrer" className="btn btn-outline-secondary mt-4">Visit the live page</a>
                </div>
                </>
            )

        )

    }
}

export default LinkDetails;