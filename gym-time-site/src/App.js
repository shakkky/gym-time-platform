import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './containers/Signup';
import Verified from './containers/Verified';
import NotFound from './containers/NotFound';

import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Switch>
          <Route path='/' exact component={ Signup } />
          <Route path='/verified' component={ Verified } />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
