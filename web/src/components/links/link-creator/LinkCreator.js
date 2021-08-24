import React from 'react'
import linkService from '../../../services/links-service'

const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/

const validations = {
    url: (value) => {
        let message;
        if (!value) {
            message = 'The URL is required'
        } else if (value && !URL_PATTERN.test(value)) {
            message = 'The URL added is not valid. Please check.'
        }
        return message;
    }
}

class LinkCreator extends React.Component {

    state = this.initialState()
    initialState() {
        return {
            link: {
                url: ""
            },
            errors: {
                url: validations.url('')
            },
            touched: {
                url: false,
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
        }))
    }

    handleInputChange(event) {
        const { name, value } = event.target
        this.setState((PrevState) => ({
            link: {
                ...PrevState.link,
                [name]: value
            },
            errors: {
                ...PrevState.errors,
                [name]: validations[name] ? validations[name](value) : undefined
            }
        }))
    }

    isFormValid() {
        const { errors } = this.state;
        return !Object.keys(errors).some(key => errors[key] !== undefined)
    }

    handleSubmitLink(event) {

        event.preventDefault()
        if (this.isFormValid()) {
            const { link } = this.state;

            linkService.create(link)
                .then(link => {
                    this.props.onCreatedLink(link);
                    this.setState(this.initialState())
                })
                .catch(error => {
                    const { errors, message } = error.response?.data || error;
                    console.error(message)
                    const touched = Object.keys(errors || {}).reduce((touched, key) => {
                        touched[key] = true;
                        return touched;
                    }, {});

                    this.setState({
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

    render() {
        const { link, errors, touched } = this.state
        return (
            <form onSubmit={(event) => this.handleSubmitLink(event)}>
                <div className="input-group mb-3">
                    <input type="text" className={`form-control ${errors.url && touched.url ? 'is-invalid' : ""}`} name="url" placeholder="https://..." value={link.url}
                        onChange={(event) => this.handleInputChange(event)} onBlur={(event) => this.handleBlur(event)} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit" disabled={!this.isFormValid()}>
                            <i className="fa fa-floppy-o" aria-hidden="true" />
                        </button>
                        {errors.url && touched.url && <div className="invalid-feedback">{errors.url}</div>}
                    </div>
                </div>
            </form>
        )
    }
}

LinkCreator.defaultProps = {
    onCreatedLink: () => { }
}

export default LinkCreator