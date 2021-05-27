import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppContextProvider } from './context';
import Login from "./Login/Login";
import Dashboard from "./Dashboard"
import './App.css';

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </AppContextProvider>
    </div>
  );
}

export default App;
