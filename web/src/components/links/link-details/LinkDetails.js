
import { Component } from 'react';
import serviceLink from '../../../services/links-service';
import Header from '../../header/Header';
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
    handleDelete() {
        const { link } = this.state
        console.log(link.id)
        serviceLink.remove(link.id)
            .then(() => this.props.history.push('/')) //no lo sabía, pero bueno saberlo (es como el res.redirect dela api)
            .catch(err => console.error(err))
    }

    render() {
        const { link } = this.state
        if (!link) return <></>
        return (
            <div className="row mb-3 ">
                <Header />

                <div className="col-6">
                    <img src={link.image} alt={link.title} className="img-fluid" />
                </div>

                <div className="row">
                    <div className="col-12">
                        <h1>{link.title}</h1>
                        <p>{link.description}</p>
                        <button type="button" className="btn btn-danger" onClick={() => this.handleDelete()}>Delete Link</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default LinkDetail