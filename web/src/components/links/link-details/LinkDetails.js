
import { Component } from 'react';
import serviceLink from '../../../services/links-service';
class LinkDetail extends Component {

    state = {
        link: null
    }

    componentDidMount() {
       const id = this.props.match?.params?.id
        serviceLink.details(id)
            .then(link => this.setState({ link }))
            .catch(err => console.error(err))
    }

    render() {
        const { link } = this.state
        if (!link) return <></>
        return(
            <div className="row mb-3 "> 

                <div className="col-6">
                    <img src={link.image} alt={link.title} className="img-fluid"/>
                </div>

                <div className="row">
                    <div className="col-12">
                        <h1>{link.title}</h1>
                        <p>{link.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default LinkDetail