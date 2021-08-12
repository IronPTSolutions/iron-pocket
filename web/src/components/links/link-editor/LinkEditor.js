import { Component } from "react";
import linkService from '../../../services/links-service'


class LinkEditor extends Component {

    state = {
        link: {
            id: '',
            title: '',
            image: '',
            description: '',
            keywords: []
        }
    }

    componentDidMount() {
        linkService.detail(this.props.match.params.id)
            .then(link => this.setState({link}))
    }


    handleChangeInput(event) {
        const { name, value } = event.target;
        this.setState((PrevState) => ({
           link : {
               ...PrevState.link,
               [name] : value
           },
        }))
    }


    handleSubmitForm(event) {
        event.preventDefault();
        linkService.edit(this.props.match.params.id, this.state.link)
            .then(link => link)
    }

    render(){

        const { link } = this.state

        return(
            <form onSubmit={(event) => this.handleSubmitForm(event)}>
                <input name="title" value={link.title} onChange={(event) => this.handleChangeInput(event)} ></input>
                <button type="submit">Submit your changes</button>
            </form>
        )
    }
}

export default LinkEditor