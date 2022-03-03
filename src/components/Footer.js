import '../css/App.css';
import React from 'react';
import CopyrightIcon from '@material-ui/icons/Copyright';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';

var data = require('../public/data.js');

function SocialMediaIcons() { 
    var twitter = data.data.links.twitter;
    var facebook = data.data.links.facebook;
    var linkedin = data.data.links.linkedin;
    var instagram = data.data.links.instagram;
    var github = data.data.links.github;
    return <div>
        <a href={twitter} class='footer-icon'><TwitterIcon fontSize='small' color='action'/></a>
        <a href={linkedin} class='footer-icon'><LinkedInIcon fontSize='small' color='action'/></a>
        <a href={facebook} class='footer-icon'><FacebookIcon fontSize='small' color='action'/></a>
        <a href={instagram} class='footer-icon'><InstagramIcon fontSize='small' color='action'/></a>
        <a href={github} class='footer-icon'><GitHubIcon fontSize='small' color='action'/></a>
    </div>
}

export default class About extends React.Component {

    render() { 
        return (
            <div class='footer-container'>
                <hr />
                <div class='copyright'>
                    <CopyrightIcon fontSize='small' color='action'/>
                    <p>Aryan Srivastava 2022. Made using React :)</p>
                    <SocialMediaIcons />
                </div>

            </div>
    )}
}