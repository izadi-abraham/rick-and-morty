import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./style.scss";

const Navbar = () => {
    return (
        <nav className="rick-navbar mb-4">
            <div className="container">
                <Link to="/" className="rick-navbar__link">
                    Rick & Morty
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;