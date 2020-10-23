import React from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <h1>let's go </h1>
      <div className="app_body">
       <Router>
       <Sidebar />
         <Switch>
           <Route path="/rooms/:roomid">
             <Chat />
           </Route>
           <Route path="/">
              <Chat />
           </Route>
         </Switch>
       </Router>
          </div>
    </div>
  );
}

export default App;
