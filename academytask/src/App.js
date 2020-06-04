import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './pages/Header';
import Countries from './pages/CountryPages/Countries';
import Cities from './pages/CityPages/Cities';

export default function App() {
  const [countryID, setCountryID] = useState(0);
  const [countryName, setCountryName] = useState('');
  return (
    <Router>
      <div className="all-screen">
        <Header />
        <Switch>
          <Route path="/" exact component={() => <Countries countryToView={handleSetCountry}/>}/>
          <Route path="/CountryView" component={() => <Cities countryID={countryID} countryName={countryName}/>}/>
        </Switch>
      </div>
    </Router>
  )
  function handleSetCountry(countryID, countryName) { 
    setCountryID(countryID);
    setCountryName(countryName);
  }
}