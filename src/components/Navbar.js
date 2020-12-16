import '../css/App.css';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'

function NavItem(props) { 
    var link = '#' + props.value;
    return <li class='navitem'><Link to={props.link}>{props.value}</Link></li>;
}

function Nav() { 
    return <div class='navmenu-container'>
            <ul class='navmenu'>
                <NavItem link='/projects' value='Projects' />
                <NavItem link='/blog' value='Blog' />
            </ul>
    </div>;
}

function NameLogo() {
    return <Link class='name-logo' to='/'><h1>Aryan Srivastava</h1></Link>;
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