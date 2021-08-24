
import { Component } from 'react';
import serviceLinks from '../../../services/links-service';
import LinkItem from '../link-item/LinkItem';



class LinkList extends Component {

    state = {
        links: []
    }

    componentDidMount() {
        serviceLinks.list()
            .then(links => this.setState({ links }))
            .catch(err => console.error(err))
    }


    render() {
        const { links } = this.state
        if (!links) return <> </>
        return (
        
            <div>
                {links.map(link => <LinkItem   key={link.id} {...link}/>)}
            </div>
        )
    }
}

export default LinkList 