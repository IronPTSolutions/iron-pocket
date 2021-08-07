import { Component } from 'react';

import linksService from '../../../services/links-service';

const validations = {
  url: (value) => {
    let message;
    if (!value) {
      message = 'URL is required';
    } else {
      try {
        new URL(value);
      } catch (error) {
        message = 'Invalid URL';
      }
    }
    return message;
  }
}
class LinkCreator extends Component {

  state = this.initialState();

  initialState() {
    return {
      link: {
        url: ''
      },
      errors: {
        url: validations.url('')
      },
      touch: {
        url: false
      }
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState(({ link, errors }) => ({
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
    const { name } = event.target;
    this.setState(({ touch }) => ({
      touch: {
        ...touch,
        [name]: true
      }
    }))
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.isValid()) {
      const { link } = this.state;
      linksService.create(link)
        .then(link => {
          this.props.onLinkCreated(link);
          this.setState(this.initialState());
        })
        .catch(error => {
          const { message, errors } = error.response?.data || error;
          this.setState({
            errors: {
              url: !errors && message,
              ...errors,
            },
            touch: {
              url: true
            }
          })
        });
    }
  }

  isValid() {
    const { errors } = this.state;
    return !Object.keys(errors).some(error => errors[error]);
  }

  render() {
    const { link, errors, touch } = this.state;
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>

        <div className="input-group mb-3">
          <input type="text" name="url" className={`form-control ${errors.url && touch.url ? 'is-invalid' : ''}`} placeholder="https://...." aria-label="Add link"
            value={link.url} onChange={(event) => this.handleChange(event)} onBlur={(event) => this.handleBlur(event)}/>
          <button className="btn btn-outline-secondary" type="submit" disabled={!this.isValid()}><i className="fa fa-plus"></i></button>
          {errors.url && touch.url && <div className="invalid-feedback">{errors.url}</div>}
        </div>

      </form>
    );
  }
}

LinkCreator.defaultProps = {
  onLinkCreated: () => {}
}

export default LinkCreator;
