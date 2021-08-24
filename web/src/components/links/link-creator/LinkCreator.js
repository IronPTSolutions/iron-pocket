import { Component } from "react";
import linksService from "../../../services/links-service";

const validations = {
    url: (value) => {
        let message;
        if (!value) {
            message = 'Link is required';
        }
        return message; //si el resultado del message es undefinde, no hay error, si el resultado es que es required, que aparezca ese string
    }
};

class LinkCreator extends Component {

    state = this.initialState()

    initialState() {
        return {
            link: {
                url: ''
            },
            errors: {
                url: validations.url('') //comillas vacias el valor inicial, pero se puede poner lo que quiera
            },
            touched: {
                url: false,
            },
        }
    }

    handleBlur(event) {
        const { name } = event.target;
        this.setState(({ touched }) => ({
            touched: {
                ...touched,
                [name]: true
            }
        }))
    }

    handleInputChange(event) {
        const name = event.target.name; //const { name, value } = event.target (aqui tenemos el input que se modifica)
        const value = event.target.value;
        this.setState((prevState) => ({
            link: { //así pisaría el contacto entero, para preserar losatributos anteriores por eso el prevState
                ...prevState.link, 
                [name]: value, //quiero cambiar ese atributo, el de la clave que venga en el name del input, accedo con notacion array, no del punto, a todo lo que venga en esa clave
            }, ///quiero que acceda a la propiedad de ese json que contiene la variable name
            errors: {
                ...prevState.errors,
                [name]: validations[name] ? validations[name](value) : undefined, //si existe ejecuto la funcion pasando el valor 
            } //[name] para cogerel CONTENIDO de esa  variable name
        }))
    }

    handleSubmit(event) {
        event.preventDefault();
        const { link } = this.state;
        linksService.create(link)
            .then(link => {
                this.props.onCreateLink(link);
                this.setState(this.initialState());
            })
            .catch(error => {
                const { errors, message } = error.response?.data || error;
                const touched = Object.keys(errors || {}).reduce((touched, key) => {
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

    render() {
        const {link, errors, touched} = this.state;
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="input-group mb-3">
                    <input type="text" name="url" className={`form-control ${errors.url && touched.url ? 'is-invalid': ''} `} placeholder="Insert link here" aria-label="Add link" value={link.url} 
                    onChange={(event) => this.handleInputChange(event)} onBlur={(event) => this.handleBlur(event)} />
                    <button class="btn btn-outline-secondary" type="submit"><i class="fa fa-plus"></i></button>
                    {errors.url && <div class="invalid-feedback">{errors.url}</div>}            
                </div>
            </form>
        )
    }
}

export default LinkCreator;