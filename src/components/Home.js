import '../css/App.css';
import React from 'react';
import PortraitImg from '../images/portraitimg.png'
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-two.css";

var data = require('../public/data.js');

function ResumeDownloadButton() {
    return <AwesomeButton type="primary">Download My Résumé</AwesomeButton>;
}

function IntroText(){ 
    return <p class='intro-text'>
    {data.data.intro_text}</p>
}   

function TLDR(){ 
    return <p class='tldr-text'>
        <span class='tldr'>TL;DR: </span>{data.data.tldr_text}</p>
}

function Portrait(){ 
    return <img class='portrait-img' src={PortraitImg} alt='Portrait of me'></img>
}

function Links(){ 
    return <div class='links-container'>
            <ul class='home-links'>
                <li>Email: <a href={data.data.links.email}>aryan_srivastava@brown.edu</a></li>
                <li>Twitter: <a href={data.data.links.twitter}>@curiousary</a></li>
                <li>Github: <a href={data.data.links.github}>@aryan_096</a></li>
                {/* <li>My Portfolio: <a href={data.data.links.behance}>@curiousary</a></li> */}
            </ul>
            <ResumeDownloadButton />
        </div>
}   

export default class Home extends React.Component {

    render() { 
        return (
            <div id='Home' class='home-container'>
                <IntroText />
                <TLDR />
                <div class='portrait-container'>
                    <Links />
                    <Portrait />
                </div>
            </div>
    )}
}