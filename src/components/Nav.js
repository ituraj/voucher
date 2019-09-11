import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';


const Nav = () => {
    return (
        <>
            <nav className="nav">
                <Logo className="logo" />
            </nav>
        </>
    );
}

export default Nav;