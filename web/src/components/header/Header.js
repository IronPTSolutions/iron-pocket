import { NavLink } from 'react-router-dom'


function Header () {
    return(
        <header className="col-3">
            <nav className="navbar navbar-dark">
                <ul className="navbar-nav">
                <li className="nav-item"><NavLink exact to="/links" className="nav-link">Links</NavLink></li>
                <li>Add Link</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header