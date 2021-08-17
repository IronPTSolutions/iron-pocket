import { Component } from "react";
import linkService from '../../../services/links-service'

const URL_PATTERN = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/

const validations = {
    url: (value) => {
        let message;
        if(!value) {
            message = 'Please, enter a url'
        } else if (value && !URL_PATTERN.test(value)) {
            message = 'Please, enter a valid URL'
        } 
        return message

    }
}

class LinkCreator extends Component {

    state = this.initialState()

    initialState(){
    return {    
        link: {
           url : '' 
        },
        errors: {
            url : validations.url('')
        },
        touched: {
            url: false
        }
    }}

    handleChangeInput(event) {
        const { name, value } = event.target;
        this.setState((PrevState) => ({
           link : {
               ...PrevState.link,
               [name] : value
           },
           errors : {
               ...PrevState.errors,
               [name] : validations[name] ? validations[name](value) : undefined
           }

        }))
    }

    handleBlur(event) {
        const { name } = event.target;
        this.setState(({ touched }) => ({
            ...touched,
            touched: {
                [name] : true
            }
        }))

    }

    isFormValid() {
        const { errors } = this.state;
        return !Object.keys(errors).some(key => errors[key] !== undefined)

    }
    

    handleSubmitForm(event) {
       
        event.preventDefault();
        if (this.isFormValid()) {

        linkService.create(this.state.link)
            .then(link => this.props.onCreateLink(link), this.setState(this.initialState()))
            .catch(error  => {
                const { errors, message} = error.response?.data || error;
                const touched =  Object.keys(errors || {}).reduce((touched, key) => {
                    touched[key] = true;
                    return touched;
                }, {});

                this.setState({
                    errors: {
                        url: errors ? undefined : message,
                        ...errors,
                    },
                    touched: {
                        url: errors ? false : true,
                        ...touched,
                    }
                })
            })      
        }
    }


    render(){
        const { link, errors, touched } = this.state
        return(
            <form onSubmit={(event) => this.handleSubmitForm(event)}>
                <div className="input-group mb-3">
                    <input type="text" className={`form-control ${touched.url && `${errors.url  ? 'bg-danger is-invalid' : 'is-valid'}`}`} name="url" placeholder="Save your data" value={link.url} onChange={(event) => this.handleChangeInput(event)} onBlur={(event) => this.handleBlur(event)} aria-label="Add your URL"  />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit" disabled={!this.isFormValid()} id="button-addon2"><i className="fas fa-plus-square"></i></button>
                    </div> 
                    {touched.url && <h6 className={errors.url ? 'invalid-feedback' : 'valid-feedback'}><i className={errors.url ? "fas fa-exclamation-triangle" : "fas fa-check" }> {errors.url ? errors.url : 'All good. Save your link!'}</i></h6> }
                </div>           
            </form>
        )
    }
}

export default LinkCreator