import '../css/App.css';
import React from 'react';

function AboutInfo() { 
    return  <div class='about-text-container'>
        <p class='about-text'>I was born and raised in Lucknow, India and am currently studying Computer Science at Brown University - Class of 2022.5.
            <br /><br />
            As an Undergraduate Research Assistant, I have created state-of-the-art deep learning models to clauses based on certain linguistic properties to help study discourse and narrative evolution on Reddit.
            For a different project, I have been collecting and analyzing India's socio-economic and political data to study hate speech patterns on a popular Indian social media platform.
            <br /><br />
            I believe technology, and social media in particular has a big impact on society and our psychology. Using computation and data, I want to better understand these effects.
            <br /><br />
            My favorite hobbies are photography, digital art, and cooking. 
            <br /><br />
            Some of my other interests are singing, 
            playing my guitar, and video games.
        </p>
    </div>
} 


export default class About extends React.Component {
    render(){ 
        return <div class='about-container'>
             <h1 class='section-header'>More about me...</h1>
             <AboutInfo />
            </div>;
    }
}