import { Component } from "react";

import linksService from "../../../services/links-service";
import LinkCreator from "../link-creator/LinkCreator";
import LinkItem from "../link-item/LinkItem";

class LinkList extends Component {
  state = {
    links: null,
  };

  componentDidMount() {
    linksService.list()
      .then((links) => this.setState({ links }))
      .catch((error) => {
        console.error(error);
      });
  }

  handleCreateLink(link) {
    this.setState(({ links }) => ({
      links: [link, ...links]
    }))
  }

  render() {
    const {links} = this.state;
    return (
      
      links && (
        <div className="container py-5">
          <div className="row mb-2">
            <div className="col">
              <LinkCreator onCreateLink={(link) => this.handleCreateLink(link)}/>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <section className="list-group">
                {links.map((link) => (
                  <div key={link.id}>
                    <LinkItem {...link} />
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default LinkList;
