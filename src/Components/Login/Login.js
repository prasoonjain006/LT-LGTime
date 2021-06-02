import React, { Component } from 'react'

// Component for user log in
export default class Login extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      pass: false
    }
  }

  // handles input of email and password
  handleInputChange = e => {
    const { value, name } = e.target
    this.setState({
      [name]: value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    fetch('https://intnapi.herokuapp.com/auth', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(err => console.log(err))
      .then(res => res.json())
      // if wrong email or password is entered
      .catch(err => alert('Could not log in, Try Again'))
      .then(user_token => {
        let { token } = user_token
        // If everything is fine, display success message, and log in user
        if (token !== '') {
          alert('Success')
        }
        localStorage.setItem('token', token)
        this.props.history.push('/')
      })
      .catch(err => console.log(err))
  }
  render () {
    return (
      // Basic Login form
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>
        <div className='form-group'>
          <input
            type='email'
            autoComplete='true'
            name='email'
            placeholder='Enter email'
            value={this.state.email}
            onChange={this.handleInputChange}
          ></input>
        </div>
        <div className='form-group'>
          <input
            type='password'
            autoComplete='true'
            name='password'
            placeholder='Enter password'
            value={this.state.password}
            onChange={this.handleInputChange}
          ></input>
        </div>
        <input type='submit' value='Login' />
      </form>
    )
  }
}
