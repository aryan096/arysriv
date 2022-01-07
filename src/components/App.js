import '../css/App.css';
import Navbar from './Navbar.js';
import About from './About.js'
import Projects from './Projects.js'
import Home from './Home.js'
import Footer from './Footer.js'
import { Route, Switch } from 'react-router-dom'
import React from 'react';

function App() {
  return (
    <div class='website-container'>

      <Navbar />
      <hr class='nav-divider'/>
      
      {/* MAIN ROUTING */}
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/about"><About /></Route>
        <Route path="/projects"><Projects /></Route>
      </Switch>

      <Footer />

    </div>

    )
}

export default App;
