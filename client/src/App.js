import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Upload from './Components/File upload/Upload';
import Getuser from './Components/Getuser/Getuser';
import Navbar from './Components/Navigation/Navbar';
import Adduser from './Components/Adduser/Adduser';


function App() {
  return ( 
  <div>
  <Router>
    <Navbar></Navbar>
    <Switch>
      <Route exact path="/">
        <Getuser></Getuser>
      </Route>
      <Route exact path="/add">
        <Adduser></Adduser>
      </Route>
      <Route exact path="/upload">
        <Upload></Upload>
      </Route>
    </Switch>
  </Router>   
  </div>
  );
}

export default App;
       
