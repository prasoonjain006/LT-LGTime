import React, { Component } from 'react'


// Register Component 
export default class Register extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: ''
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
    fetch('https://intnapi.herokuapp.com/register', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (res) {
        console.log(res.status)
        // display error if Invalid email or password is entered
        if (res.status === 605) {
          alert('Email or password incorrect, Maybe Already Registered')
        }
        // If everything is correct, Display Success message
        if (res.status === 200) {
          alert('Successfully Registered')
        }
        res.json()
      })
      .then(user_token => {
        let { token } = user_token
        localStorage.setItem('token', token)
        this.props.history.push('/')
      })
      .catch(err => console.log(err))
  }
  render () {
    return (

        // Register Form  
      <form onSubmit={this.onSubmit}>
        <h1 className='text-center'>Register</h1>
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
        <input type='submit' value='Register' />

      </form>
    )
  }
}
