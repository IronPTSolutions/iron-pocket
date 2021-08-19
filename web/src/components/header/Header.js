import { NavLink } from 'react-router-dom'


function Header () {
    return(
        <header className="col-3">
            <nav className="navbar navbar-dark">
                <a className="navbar-brand" href="/">
                    <img src="./img/iron-pocket.png" alt="iron pocket"/>
                </a>
                <ul className="navbar-nav">                
                  <li className="nav-item"><NavLink exact to="/links" className="nav-link">Links</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header