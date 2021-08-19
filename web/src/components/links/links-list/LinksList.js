import React from "react"
import linksService from '../../../services/links-service'
import LinkItem from "../link-item/LinkItem"


class Linkslist extends React.Component {

    state = {
        links: [],
        isLoading: true
    }

    fetchLinks() {
        linksService.list()
            .then(links => this.setState({ links, isLoading: false }))
            .catch(error => {
                this.setState({ isLoading: false })
                console.error(error)
            })
    }

    componentDidMount() {
        this.fetchLinks();
    }

    render() {
        const { links, isLoading } = this.state;
        return (
            links &&
            <>
                {isLoading ? (<i className="fa fa-gear fa-spin" />) : (
                    <div className="row mb-2">
                        <div className="col">
                            {links.map(link =>
                                <div key={link.id} className="mb-2">
                                    <LinkItem {...link} />
                                </div>)}
                        </div>
                    </div>
                )}
            </>
        )
    }
}
export default Linkslist