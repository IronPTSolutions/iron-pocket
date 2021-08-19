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
            if (error.response?.status ===404) {
                this.props.history.push('/404');
            }
        })
    }
    render() {
        const { link } = this.state
        return(
            link && (
            <>
                        <div className="col-md-2">
                        <img src={link.image}/>
                        </div>
                        <div>{link.title}</div>
                        <div>{link.description}</div>
</>
            )

        )

    }
}

export default LinkDetails;