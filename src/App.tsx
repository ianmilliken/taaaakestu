/* eslint-disable no-use-before-define */
import 'react-tippy/dist/tippy.css';
import './App.scss';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddTest from './pages/AddTest';
import EditTest from './pages/EditTest';
import ListTests from './pages/ListTests';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={ListTests} />
      <Route path="/add-test" component={AddTest} />
      <Route peth="/edit-test/:id" component={EditTest} />
    </Switch>
  );
};

export default App;
