import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './pages/Header';
import Countries from './pages/Countries';

export default function App() {
  const [countries, setCountries] = useState({});
  return (
    <Router>
      <div className="notFooter">
        <Header />
        <Switch>
          <Route path="/" exact component={Countries}/>
        </Switch>
      </div>
    </Router>
  )
}
