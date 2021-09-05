
import serviceLink from "../../../services/links-service";
import { Component } from 'react';

const URL_PATTERN = /^(ftp|http|https):\/\/[^ "]+$/

const validations = {
    url: (value) => {
        let message;
        if (!value) {
            message = 'URL is requered mamahue!'
        } else if (value && !URL_PATTERN.test(value)) {
            message = 'URL has to be valid!'
        }
        return message
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

    handleChange(event) {
       const { name, value } = event.target
       this.setState(({ link, errors}) => ({
           link: {
               ...link,
               [name]: value
           },
           errors: {
               ...errors,
               [name]: validations[name] ? validations[name](value) : undefined
           }
       }))
    }

    handleBlur(event) {
        const { name } = event.target
        this.setState(({ touched }) => ({
            touched: {
                ...touched,
                [name]: true
            }
        }))
    }

    handleSubmit(event) {
        const { link } = this.state
        event.preventDefault()
        serviceLink.create(link)
            .then(link => this.props.onLinkCreated(link))
            .catch(err => console.error(err))
    }

    render() {
        const {link, errors, touched } = this.state
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="input-group mb-3">
                    <input type="text" name="url"  className={`form-control ${errors.url && touched.url ? 'is-invalid' : ''}`} placeholder="https://.." 
                        value={link.url}  onChange={(event) => this.handleChange(event)} onBlur={(event) => this.handleBlur(event)}/>
                    <button className="btn btn-outline-secondary" type="submit" ><i className="far fa-hand-point-up"></i></button>
                    {errors.url && touched.url && <div className="invalid-feedback">{errors.url}</div>}
                </div>
            </form>
        )
    }
}

LinkCreator.defaultProps = {
    onLinkCreated: () => {}
  }
export default LinkCreator