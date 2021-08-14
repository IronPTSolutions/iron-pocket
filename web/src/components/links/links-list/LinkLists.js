import React, {Component} from 'react'
import LinkItem from '../link-item/LinkItem'
import linkService from '../../../services/links-service'
import LinkCreator from '../link-creator/LinkCreator'

class LinkList extends Component {
state = {
    links: [],
    isLoading: true,
    }

componentDidMount() {
    linkService.list()
        .then(links => this.setState({ links, isLoading: false }))
        .catch(error => { 
            this.setState({ isLoading: false })
            console.error(error)})
}

handleCreateLink(link) {
    this.setState(({ links }) => ({
      links: [link, ...links]
    }))
}


render(){
    const { links, isLoading } = this.state
    links.sort((a, b) => b.createdAt - a.createdAt)

    return(
        links &&
        <div className="col-9 container mt-5">
            <LinkCreator onCreateLink={(link) => this.handleCreateLink(link)} />
            {isLoading ? (<i className="fa fa-gear fa-spin" ></i>) : (<h2>Your pocketed links</h2>) }            
            {links.map(link => <LinkItem key={link.id} {...link} />) }
        </div>
    )
}
}

export default LinkList