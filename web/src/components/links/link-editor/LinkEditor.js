import { Component } from "react";
import linkService from '../../../services/links-service'

const validations = {
    title: (value) => {
        let message;
        if (!value) {
            message = 'Your link needs a title'
        }
        return message
    },
    image: (value) => {
        let message;
        if (!value) {
            message = 'Your link needs a picture'
        }
        return message
    },
    description: (value) => {
        let message;
        if (!value) {
            message = 'Your link needs a description'
        }
        return message
    }
    
}


class LinkEditor extends Component {

    state = {
        link: {
            id: '',
            title: '',
            image: '',
            description: '',
            keywords: []
        },

        errors: {
            title: undefined,
            image: undefined,
            description: undefined
        },

        touched: {
            title: false,
            image: false,
            description: false

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

           errors: {
               ...PrevState.errors,
               [name] : validations[name] ? validations[name](value) : undefined
           },
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

    isFormValid(){
        const { errors } = this.state;
        return !Object.keys(errors).some(key => errors[key] !== undefined)
    }

    handleSubmitForm(event) {
        event.preventDefault();

        if (this.isFormValid()){

        linkService.edit(this.props.match.params.id, this.state.link)
            .then(() => this.props.history.push('/links'))
            .catch(error => {
                const { errors, message } = error.response?.data || error;
                const touched = Object.keys(errors || {}).reduce((touched, key) => {
                    touched[key] = true;
                    return touched;
                }, {});

                this.setState( {
                    errors: {
                        name: errors ? undefined : message,
                        ...errors,
                    },

                    touched: {
                        name: errors ? false : true,
                        ...touched
                    }
                })
            })
        }
    }

    render(){

        const { link, touched, errors } = this.state

        return(

            <div className="col-9 p-5">
                <h1>Edit your saved link</h1>
            <form onSubmit={(event) => this.handleSubmitForm(event)}>
                <div className="img-editor">
                    <img src={ link.image } alt={ link.title } />
                </div>
                <div className="editor col-9">
                    <h4>Title</h4> 
                    <div className="input-group mb-1">                
                        <span className="input-group-text"><i class="fas fa-heading fa-fw"></i></span>
                        <input name="title" type="text" className={`form-control ${touched.title && `${errors.title  ? 'bg-danger is-invalid' : 'is-valid'}`}`} placeholder="Title" value={link.title} onChange={(event) => this.handleChangeInput(event)} onBlur={(event) => this.handleBlur(event)} /> 
                        {touched.title && <h6 className={errors.title ? 'invalid-feedback' : 'valid-feedback'}><i className={errors.title ? "fas fa-exclamation-triangle" : "fas fa-check" }> {errors.title ? errors.title : 'One less, title is Ok!'}</i></h6> }

                    </div>                    
                    <h4>Image</h4> 
                    <div className="input-group mb-1">
                        <span className="input-group-text"><i class="far fa-image"></i></span>
                        <input name="image" type="text" className={`form-control ${touched.image && `${errors.image  ? 'bg-danger is-invalid' : 'is-valid'}`}`} placeholder="Image Link" value={link.image} onChange={(event) => this.handleChangeInput(event)} onChange={(event) => this.handleChangeInput(event)} onBlur={(event) => this.handleBlur(event)}/> 
                        {touched.image && <h6 className={errors.image ? 'invalid-feedback' : 'valid-feedback'}><i className={errors.image ? "fas fa-exclamation-triangle" : "fas fa-check" }> {errors.image ? errors.image : 'One less, image is Ok!'}</i></h6> }
                    </div> 
                    <h4>Description</h4> 
                    <div class="form-floating">
                        <textarea  name="description" className={`form-control ${touched.description && `${errors.description  ? 'bg-danger is-invalid' : 'is-valid'}`}`} placeholder="Leave a comment here" value={link.description} onChange={(event) => this.handleChangeInput(event)} onChange={(event) => this.handleChangeInput(event)} onBlur={(event) => this.handleBlur(event)} >       
                        </textarea>
                        {touched.description && <h6 className={errors.description ? 'invalid-feedback' : 'valid-feedback'}><i className={errors.description ? "fas fa-exclamation-triangle" : "fas fa-check" }> {errors.description ? errors.description : 'One less, title is Ok!'}</i></h6> }
                    </div>                   
                    <button  className="btn btn-primary" disabled={!this.isFormValid()} type="submit">Submit your changes</button>
                </div>
            </form>
            </div>
        )
    }
}

export default LinkEditor