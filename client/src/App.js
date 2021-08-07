import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Connect from './component/Connect';
import Home from './component/Home'
import Navbar from './component/Navbar'


function App() {
  return (
   <Router>
     <Navbar />
     <Switch>
       <Route exact path="/">
         <Home />
       </Route>
       <Route exact path="/connect">
         <Connect />
       </Route>
     </Switch>
   </Router>
  );
}

export default App;

