import React, { useState } from 'react';
import './styles/App.css';
import Sidebar from './components/Sidebar.js';
import Chat from './components/Chat.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login.js';
import { useStateValue} from "./StateProvider.js";

function App() {
  // const [user, setUser] = useState(null);
  const [{user}, dispatch] = useStateValue();
  return (
    // BEM naming convention "app"
    <div className="app">
      {!user? (
        <Login/>
      ): (
        <div className="app_body">
        <Router>
          <Sidebar/>
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat/>
              </Route>
              <Route exact path='/'>
                <Chat/>
              </Route>
            </Switch>
        </Router> 
      </div>
      )}
    </div>
  );
}

export default App;