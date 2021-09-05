import { Link } from "react-router-dom";


function Header() {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1 " >Links</span>
                <Link to={'/'} className="stretched-link"/>
            </div>
        </nav>
    )
}

export default Header
