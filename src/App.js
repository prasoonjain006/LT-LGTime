
import {  Route, Switch, BrowserRouter } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Secret from './Components/secret/Secret'
import withAuth from './Components/hoc/withAuth'
import Logout from './Components/Logout/Logout'
import Register from './Components/register/Register'
import Post from './Components/post/Post'
import Countries from './Components/countries/Countries'
import './App.css'


class App extends Component {
  state = {
    toggle: false
  }
  Toggle = () => {
    this.setState({ toggle: !this.state.toggle })
  }
  render () {
    return (
      <>
      {/* contains all the Navbar Elements   */}
        <div className='navBar'>
          <ul className={this.state.toggle ? 'nav-links show-nav' : 'nav-links'} >
          
            <li>
              <a href='/Home'>Home</a>
            </li>
            <li>
              <a href='/login'>Login</a>{' '}
            </li>
            <li>
              <a href='/logout'> Logout</a>{' '}
            </li>
            <li>
              <a href='/register'>Register</a>
            </li>
            <li>
              <a href='/post'>Post</a>
            </li>
            <li>
              <a href='/countries'>Countries</a>
            </li>
          </ul>
        </div>

        {/* // BrowserRouter to define routes according to our backend */}
        <BrowserRouter>
          <div>
            <Switch>
              <Route path='/home' component={Home} />  
              {/* secret page is just for checking our secure routes are working or not                */}
              <Route path='/secret' component={withAuth(Secret)} />
              <Route path='/login' component={Login} />
              <Route path='/logout' component={Logout} />
              <Route path='/register' component={Register} />
              <Route path='/post' component={Post} />
              <Route path='/countries' component={Countries} />
            </Switch>
          </div>
        </BrowserRouter>
      </>
    )
  }
}
export default App
