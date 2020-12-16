import '../css/App.css';
import Navbar from './Navbar.js';
import About from './About.js'
import Projects from './Projects.js'
import Blog from './Blog.js'
import OtherLinks from './OtherLinks.js'
import Footer from './Footer.js'
import { Link, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div class='website-container'>
      
      <Navbar />
      <hr class='nav-divider'/>
      
      {/* MAIN ROUTING */}
      <Switch>
        <Route exact path="/"><About /></Route>
        <Route path="/blog"><Blog /></Route>
        <Route path="/projects"><Projects /></Route>
      </Switch>

      <Footer />

    </div>

    )
}

export default App;
