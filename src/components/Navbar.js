import '../css/App.css';
import React from 'react';
import { Link } from 'react-router-dom'
var data = require('../public/data.js');


function NavItem(props) { 
    return <li class='navitem'><Link to={props.link}>{props.value}</Link></li>;
}

function Nav() { 
    return <div class='navmenu-container'>
            <ul class='navmenu'>
                <NavItem link='/' value='Home' />
                <NavItem link='/about' value='About' />
                <NavItem link='/projects' value='Work' />
                {/* <NavItem link='/photography' value='Photography' /> */}
                {/* <NavItem link='/blog' value='Blog' /> */}
            </ul>
    </div>;
}

function NameLogo() {
    return <Link class='name-logo' to='/'>
        <img class='portrait-img' src={data.data.logo} alt='silly portrait of me'></img>
    </Link>;
}

export default class Navbar extends React.Component {

    render() { 
        return (
            <div class='navbar-container'>
                <NameLogo />
                <Nav />
            </div>
    )}
}