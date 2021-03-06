import React, { Component } from 'react';
import logo from './eyak.png';
import './App.css';

import { Router, Route, browserHistory } from 'react-router'

import Landing from './components/Landing';
import QuestionBoard from './components/QuestionBoard';
import JoinBoard from './components/JoinBoard';

class App extends Component {

  render() {
    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className ="header-text">eYak</h2>
        </div>

        <Router history={browserHistory}>
          <Route path='/' component={Landing} />
          <Route path='/q/:id' component={QuestionBoard}/>
          <Route path='/q/:id/master' component={QuestionBoard} master={true}/>
          <Route path='/join' component={JoinBoard} />
        </Router>

      </div>
    );
  }
}

export default App;
