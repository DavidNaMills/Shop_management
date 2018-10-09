import React from 'react';
import {Route, Switch, Router} from 'react-router-dom';
import history from './components/history';

import AuthRoute from './components/login/AuthRoute';
import NavBarContainer from './components/container/NavBarContainer';
import TabNavigation from './components/TabNavigation';
import Login from './components/login/Login';
import IsAuth from './components/login/IsAuth';
import Dashboard from './components/Dashboard';
import AlertBar from './components/container/AlertBar';

import Development from './components/presentational/Development';

import {StaffContainer, CustomerContainer, InventoryContainer, PurchaseContainer} from './components/container';


class App extends React.Component{ 

    render(){
        return(
        <Router  history={history}>
            <div>
                <IsAuth><NavBarContainer /></IsAuth>
            <div className="container">
                <AlertBar />
                <IsAuth><TabNavigation /></IsAuth>
                
                <Switch>
                    <AuthRoute path="/purchase" exact={true} Component={PurchaseContainer} level={-1}/>
                    <AuthRoute path="/staff" exact={true} Component={StaffContainer} level={3}/>
                    <AuthRoute path="/customer" exact={true} Component={CustomerContainer} level={-1}/>
                    <AuthRoute path="/inventory" exact={true} Component={InventoryContainer} level={-1}/>
                    <AuthRoute path="/dashboard" exact={true} Component={Dashboard} level={-1}/>
                    <Route path="/" exact={true} component={Login}/>
                </Switch>
            </div>
            </div>
        </Router>
);   }

}

export default App;