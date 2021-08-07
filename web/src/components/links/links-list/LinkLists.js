import { Component } from 'react';
import linksService from '../../../services/links-service';
import LinkItem from '../link-item/LinkItem';
import LinkCreator from '../link-creator/LinkCreator';

class LinksList extends Component {

  state = {
    links: []
  }

  componentDidMount() {
    linksService.list()
      .then(links => this.setState({ links }))
      .catch(error => console.error(error))
  }

  handleLinkCreated(link) {
    this.setState(({links}) => ({ links: [link, ...links] }))
  }
  
  render() {
    const { links } = this.state;
    return (
      <section>
        <LinkCreator onLinkCreated={(link) => this.handleLinkCreated(link)}/>
        {links.map(link => <LinkItem key={link.id} {...link} />)}
      </section>)
  }
}

export default LinksList;
