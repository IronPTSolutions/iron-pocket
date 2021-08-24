import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid" >
      <Link className="navbar-brand" to="/" >Hello Pocket</Link>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Links</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    )
}
export default Header