import React, { Component } from 'react'

// Home page Component
// Just displays one message.
export default class Home extends Component {
  constructor () {
    super()
    this.state = {
      message: 'Welcome to home page'
    }
  }

  componentDidMount () {
    fetch('https://intnapi.herokuapp.com/home')
      .then(res => res.text())
      .then(res => this.setState({ message: res }))
      .catch(err => console.log(err))
  }
  render () {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    )
  }
}
