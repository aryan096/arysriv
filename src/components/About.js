import '../css/App.css';
import React from 'react';

function AboutInfo() { 
    return  <div class='about-text-container'>
        <p class='about-text'>
            The thick plottens
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