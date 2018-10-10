import React, { Component } from 'react'
import {HashRouter,Route, Switch} from 'react-router-dom'
import Home from '../views/home'
import SecondPage from '../views/secondPage'
import NotMatch from '../views/notMatch'
import Admin from '../views/admin'

export default class index extends Component {

  render() {
    return (
    <HashRouter>
      <div>
        <Switch>
          <Route path='/' render={
            () => 
            <Admin>
              <Switch>
                <Route path='/admin/home' component={Home}></Route>
                <Route path='/admin/secondPage' component={SecondPage}></Route>
                <Route  component={NotMatch}></Route>
              </Switch>    
            </Admin>
          }></Route>
          <Route  component={NotMatch}></Route>
        </Switch> 
      </div>
    </HashRouter>
    )
  }
}
