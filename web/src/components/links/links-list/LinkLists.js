import { Component } from 'react';
import LinkItem from '../link-item/LinkItem';
import LinkCreator from '../link-creator/LinkCreator';

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

    handleCreateLink(link) {
        this.setState(({ links }) => ({
            links: [link, ...links]
        }))
    }

    handleDeleteLink(id) {
        linkService.remove(id)
            .then(link => this.setState({ link }),
            this.props.history.push('/links'))
            .catch(error => {
                console.error(error);
                if (error.response?.status === 404) {
                    this.props.history.push('/404');
                }
            })

    }



    render() {
        const { links, isLoading } = this.state;
        return (
            links && 
            <>
            <div className="container">
            <LinkCreator onCreateLink={(link) => this.handleCreateLink(link)}/>
            </div>
            {isLoading ? (<i className="fa fa-gear fa-spin"></i>) : (
                <div className="row mb-2">
                    <div className="col">
                        <ul className="list-group">
                            {links.map(link => 
                                <li key={link.id} className="list-group-item list-group-item-action">
                                    <LinkItem {...link} onDeleteLink={(id) => this.handleDeleteLink(id)}/>
                                </li>
                                )}
                        </ul>
                    </div>
                </div>
            )}
            </>
        )
    }
}

export default LinkLists;


