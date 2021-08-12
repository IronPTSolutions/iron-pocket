import React from 'react';
import { NavLink} from 'react-router-dom';


function Header() {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <NavLink className="navbar-brand" aria-current="page" exact to="/links">Iron Pocket</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" exact to="/links">Links</NavLink>
                    </li>
                </ul>
                <span className="navbar-text text-muted">Your brain dump 😊</span>
                </div>
            </div>
        </nav>
    )
}

export default Header;