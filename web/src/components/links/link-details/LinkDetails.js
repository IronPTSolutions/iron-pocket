import { Component } from 'react';

import linkService from '../../../services/links-service';
import { Link } from 'react-router-dom';
class LinkDetails extends Component {

  state = {
    link: null
  }

  componentDidMount() {
    const id = this.props.match?.params?.id;
    linkService.details(id)
      .then(link => this.setState({ link }))
      .catch(error => console.error(error));
  }

  handleDeleteLink() {
    const { link } = this.state;
    linkService.remove(link.id)
      .then(() => this.props.history.push('/'))
      .catch(error => console.error(error));
  }

  render() {
    const { link } = this.state;
    return link && (
      <>
        <div className="row mb-3">
          <div className="col-6"><img src={link.image} alt={link.title} className="img-fluid"/></div>
        </div>
        <div className="row">
          <div className="col-12">
            <h1>{link.title}</h1>
            <p>{link.description}</p>
          </div>
          <div className="col-12">
            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
              <Link role="button" className="btn btn-primary" to={`/links/${link.id}/edit`}><i className="fa fa-edit"></i></Link>
              <a type="button" className="btn btn-secondary" href={link.url} target="_blank" rel="noopener noreferrer"><i className="fa fa-eye"></i></a>
              <button type="button" className="btn btn-danger" onClick={() => this.handleDeleteLink()}><i className="fa fa-times"></i></button>
            </div>
          </div>
        </div>
      </>
      
    )
  }
}

export default LinkDetails;
