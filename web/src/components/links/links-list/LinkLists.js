import { Component } from 'react';
import LinkItem from '../link-item/LinkItem';

import linkService from '../../../services/links-service';



class LinkLists extends Component {

    state = {
        links: [],
        isLoading: true
    }

   fetchLinks() {
        linkService.list()
            .then(links => this.setState({ links, isLoading: false }))
            .catch(error => {
                this.setState({ isLoading: false })
                console.error(error)
                });
    }

    componentDidMount() {
        this.fetchLinks();
    }


    render() {
        const { links, isLoading } = this.state;
        return (
            links && 
            <>
            {isLoading ? (<i className="fa fa-gear fa-spin"></i>) : (
                <div className="row mb-2">
                    <div className="col">
                        <ul className="list-group">
                            {links.map(link => 
                                <li key={link.id} className="list-group-item list-group-item-action">
                                    <LinkItem {...link}/>
                                </li>
                                )}
                        </ul>
                    </div>
                </div>
            )}
            <div>helloooooo</div>
            </>
        )
    }
}

export default LinkLists;


