import '../css/App.css';
import React from 'react';
import { Link } from 'react-router-dom'

function NavItem(props) { 
    return <li class='navitem'><Link to={props.link}>{props.value}</Link></li>;
}

function Nav() { 
    return <div class='navmenu-container'>
            <ul class='navmenu'>
                <NavItem link='/' value='Home' />
                <NavItem link='/about' value='About' />
                <NavItem link='/projects' value='Projects' />
                <NavItem link='/photography' value='Photography' />
                {/* <NavItem link='/blog' value='Blog' /> */}
            </ul>
    </div>;
}

function NameLogo() {
    return <Link class='name-logo' to='/'>
        <div class='name-logo-flip-cards'>
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="/logo1.svg" alt="A" class='navbar-logo-image' />
                    </div>
                    <div class="flip-card-back">
                        <img src="/logo1_flip.svg" alt="A" class='navbar-logo-image' />
                    </div>
                </div>
            </div> 
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="/logo2.svg" alt="R" class='navbar-logo-image' />
                    </div>
                    <div class="flip-card-back">
                        <img src="/logo2_flip.svg" alt="R" class='navbar-logo-image' />
                    </div>
                </div>
            </div> 
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="/logo3.svg" alt="Y" class='navbar-logo-image' />
                    </div>
                    <div class="flip-card-back">
                        <img src="/logo3_flip.svg" alt="Y" class='navbar-logo-image' />
                    </div>
                </div>
            </div> 
        </div>
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