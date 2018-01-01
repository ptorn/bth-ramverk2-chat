import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Gomoku from './pages/Gomoku';
import About from './pages/About';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Gomoku}/>
                    <Route path='/about' component={About}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
