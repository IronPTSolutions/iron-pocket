import { Component } from "react";
import linkService from '../../../services/links-service'

class LinkCreator extends Component {

    state= {
        link: {
           url : '' 
        }
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
        linkService.create(this.state.link)
            .then(link => this.props.onCreateLink(link))
            .catch()
    }


    render(){
        const {link} = this.state
        return(
            <form onSubmit={(event) => this.handleSubmitForm(event)}>
                <input name="url" placeholder="Save your data" value={link.url} onChange={(event) => this.handleChangeInput(event)}></input>
                <button type="submit">Add item</button>
            </form>
        )
    }
}

export default LinkCreator