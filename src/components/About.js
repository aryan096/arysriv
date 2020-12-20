import '../css/App.css';
import React from 'react';

function AboutInfo() { 
    return  <div class='about-text-container'>
        <p class='about-text'>I was born and raised in Lucknow, India and am currently studying Computer Science at Brown University - Class of 2022.5.
            <br /><br />
            Currently, I am experimenting with machine learning models to study narrative formation on social
            media platforms as part of the Brown AI Lab. I believe technology, and social media in particular has 
            a lot of impact on our individual and collective cognition, and we must find ways to tackle 
            them with technological solutions as well as policy.
            <br /><br />
            I am passionate about designing innovative, accessible, and ethical 
            solutions to the increasingly complex problems we face as a society, specifically around topics like
            internet misinformation networks, echo-chambers, and the decline of privacy on the internet.
            <br /><br />
            Recently, I have fallen in love with making digital art! I spend a lot of time sketching away 
            on my Wacom Pad these days. Currently, I am beginning to learn 2D animation! :)
            <br /><br />
            Some other interests include: anything and everything related to space and cosmology, singing and 
            playing by guitar, vidyo gaems, and cooking efficiently (seriously, optimize everything!).
        </p>
    </div>
} 


export default class About extends React.Component {
    render(){ 
        return <div class='about-container'>
             <h1 class='section-header'>So, you want to know more about me?</h1>
             <AboutInfo />
            </div>;
    }
}