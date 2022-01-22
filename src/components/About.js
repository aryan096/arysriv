import '../css/App.css';
import React from 'react';

function AboutInfo() { 
    return  <div class='about-text-container'>
        <p class='about-text'>I was born and raised in Lucknow, India and am currently a senior studying Computer Science at Brown University.
            <br /><br />
            I have mostly been working as an Undergraduate Research Assistant. I have created state-of-the-art neural networks to classify text based on clause-level linguistic features - genericity, aspect, and boundedness. The models are being used to study discourse structures and evolution of political narratives on Reddit.
            <br /><br />
            For a different project, I created the first clean geolocated dataset of villages and Panchayat (village-level) elections candidates in Uttar Pradesh - India's most populous state. Using this data, and other socio-economic data, we are studying the patterns of hate speech on ShareChat - a huge social media platform in India.
            India's socio-economic and political data to study hate speech patterns on a popular Indian social media platform.
            <br /><br />
            I am immensely interested in the field of Computational Social Science. I love everything data, and want to utilize its power to diagnose the social and political effects of technology and the internet.
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