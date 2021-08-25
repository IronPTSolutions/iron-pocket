
import { Component } from 'react';
import serviceLinks from '../../../services/links-service';
import LinkCreator from '../link-creator/LinkCreator';
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

    handleCreator(link) {
        console.log("oioioi")
        console.log(link)
        this.setState(({ links }) => ({
            links: [...links, link]
        }))
    }

    render() {
        const { links } = this.state
        if (!links) return <> </>
        return (
        
            <div>
                <LinkCreator onLinkCreated={(link) => this.handleCreator(link)} />
                {links.map(link => <LinkItem   key={link.id} {...link}/>)}
            </div>
        )
    }
}

export default LinkList 