import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Hello Pocket</a>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/links">Links</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    )
}
export default Header