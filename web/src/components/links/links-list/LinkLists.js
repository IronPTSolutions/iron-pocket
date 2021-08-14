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
        .then(links => this.setState({ links : links.sort((a, b) => b.createdAt.localeCompare(a.createdAt)), isLoading: false }))
        .catch(error => { 
            this.setState({ isLoading: false })
            console.error(error)})
}

handleCreateLink(link) {
    this.setState(({ links }) => ({
      links: [ link, ...links ]
    }))
}


render(){

    document.title = 'Your saved links';
    const { links, isLoading } = this.state;
  
    return(
        links &&
        <div className="col-9 container p-5">
            <h1>This is your Iron Pocket!</h1>
            <h2>Start saving your links and have fun</h2>
            <LinkCreator onCreateLink={(link) => this.handleCreateLink(link)} />
            {isLoading ? (<i className="fa fa-gear fa-spin" ></i>) : (<h2>Your pocketed links</h2>) }            
            {links.map(link => <div><p> {link.id} </p> <LinkItem key={link.id} {...link} id={link.id} /></div>) }
        </div>
    )
}
}

export default LinkList