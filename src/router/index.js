import React, { Component } from 'react'
import {HashRouter,Route, Switch} from 'react-router-dom'
import Home from '../views/home'
import Order from '../views/order'
import NotMatch from '../views/notMatch'
import Admin from '../views/admin'
import Pie from '../views/pie'
import Bar from '../views/bar'
import OrderDetails from '../views/order/details'
import User from '../views/user'

export default class index extends Component {

  render() {
    return (
    <HashRouter>
      <div>
        <Switch>
          <Route path='/common/order/detail/:id' component={OrderDetails}></Route> 
          <Route path='/' render={
            () => 
            <Admin>
              <Switch>
                <Route path='/admin/home' component={Home}></Route>
                <Route path='/admin/order' component={Order}></Route>
                <Route path='/admin/pie' component={Pie}></Route>
                <Route path='/admin/bar' component={Bar}></Route>
                <Route path='/admin/user' component={User}></Route>
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
