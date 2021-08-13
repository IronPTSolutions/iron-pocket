import { Component } from 'react';

import linkService from '../../../services/links-service';



const validations = {
    url: (value) => {
        let message;
        if (!value) {
            message = 'URL is not valid'
        }
        return message;
    }
}

class LinkCreator extends Component {

    state = this.initialState()

    initialState() {
        return {
            link: {
                url: ''
            },
            errors: {
                url: validations.url('')
            },
            touched: {
                url: false
            }
        }
    }

    handleBlur(event) {
        const inputName = event.target.name;
        this.setState(({ touched }) => ({
            touched: {
                ...touched,
                [inputName]: true
            }
        }));
    }

    handleInputChange(event) {
        const inputName = event.target.name;
        const value = event.target.value;
        this.setState((prevState) => ({
            link: {
                ...prevState.link,
                [inputName] : value
            },
            errors: {
                ...prevState.errors,
                [inputName] : validations[inputName] ? validations[inputName] (value) : undefined,
            }

        }))
    }

    isFormValid() {
        const { errors } = this.state;
        return !Object.keys(errors).some(key => errors[key] !== undefined)
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.isFormValid()) {
            const { link } = this.state;

            linkService.create(link)
                .then(link => this.props.onCreateLink(link))
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

    render() {
        const { link, errors, touched } = this.state;
        return (
            <div className="row mb-2">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="input-group m-3">
                    <input type="text" name="url" className={`form-control ${errors.url && touched.url ? 'is-invalid' : ''}`} placeholder="https://..." 
                    onChange={(event) => this.handleInputChange(event)}
                    onBlur={(event) => this.handleBlur(event)} aria-label="Add link" value={link.url}/>
                    <button className="btn btn-outline-secondary" type="submit" disabled={!this.isFormValid()}>
                        <i className="fa fa-plus"></i>
                    </button>
                    {errors.url && <div className="invalid-feedback">{errors.url}</div>}
                    </div>
                </form>
            </div>
        )
    }


}

LinkCreator.defaultProps = {
    onCreateLink: () => {}
}


export default LinkCreator;