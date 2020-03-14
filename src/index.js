import React, { useState, useEffect, useMemo } from 'react';
import reactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'

import './style.less';
import { Header, Menus } from '@components';
import { menusResource, shitoryResource } from './resource';
import Agent from '@modules/agent';
import Dashboard from '@modules/dashboard';

function Extra() {

  const [historyList, setHistoryList] = useState([]);
  useEffect(() => {
    shitoryResource.get().then(setHistoryList);
  }, []);

  return (
    <ul className="extra-history">
      <div>History</div>
      {
        historyList.map((history, index) => <li key={index}>{history}</li>)
      }
    </ul>
  )
}

function DrawerMenu() {
  return <i className="icon-navicon" onClick={() => Menus.open()} />
}

const Content = function () {
  return (
    <Switch>
      <Route exact path={'/DASHBOARD'} component={() => <Dashboard/>}/>
      <Route exact path={'/AGENT'} component={() => <Agent/>}/>
    </Switch>
  )
};

function App() {

  const [menus, setMenus] = useState([]);

  useEffect(() => {
    menusResource.get().then(setMenus);
  }, []);

  return (
    <Router>
      {
        useMemo(() => <Header extra={<DrawerMenu/>}/>, [])
      }
      <section className="container">
        {
          useMemo(() => <Menus menus={menus} defaultKey={'AGENT'} extra={<Extra />}/>, [menus])
        }
        {
          useMemo(() => <div className="dashboard"><Content/></div>, [])
        }
      </section>
    </Router>
  )
}

reactDOM.render(<App/>, document.getElementById('app'));

