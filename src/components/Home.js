import '../css/App.css';
import React from 'react';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-two.css";

var data = require('../public/data.js');

function ResumeDownloadButton() {
    var link = data.data.links.resume;
    return <a href={link}><AwesomeButton type="primary">Download My Résumé</AwesomeButton></a>;
}

function IntroText(){ 
    return <p class='intro-text'>
    {data.data.intro_text}</p>
}   

function TLDR(){ 
    return <p class='tldr-text'>
        <span class='tldr'></span>{data.data.tldr_text}</p>
}

// function Portrait(){ 
//     return <img class='portrait-img' src='/portraitimg_outline.png' alt='silly portrait of me'></img>
// }

function Links(){ 
    return <div class='links-container'>
            <ul class='home-links'>
                <li>Email: <a href={'mailto:' + data.data.links.email}>{data.data.links.email}</a></li>
                <li>Twitter: <a href={data.data.links.twitter}>{'@' + data.data.links.twitter}</a></li>
                <li>Github: <a href={data.data.links.github}>{'@' + data.data.links.github}</a></li>
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
                </div>
            </div>
    )}
}