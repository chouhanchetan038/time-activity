import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                                <a className="nav-link active"><Link to='/'>Home</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active"><Link to='/'>Activity</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><Link to='/repoter'>Reporter</Link></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav;