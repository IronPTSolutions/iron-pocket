import { Component } from "react";

import linksService from "../../../services/links-service";
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

  render() {
    const {links} = this.state;
    return (
      
      links && (
        <div className="container py-5">
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
