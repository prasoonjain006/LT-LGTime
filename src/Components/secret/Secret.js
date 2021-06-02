import React, { Component } from 'react'


// This Component is just for checking our login feature is working or not.
export default class Secret extends Component {
  constructor () {
    super()
    this.state = {
      message: 'Loading...'
    }
  }

  // Just returns a message from server, if we are logged in.
  componentDidMount () {
    fetch('https://intnapi.herokuapp.com/secret', {
      headers: { 'x-access-token': localStorage.getItem('token') }
    })
      .then(res => res.text())
      .then(res => this.setState({ message: res }))
  }

  render () {
    return (
      <div>
        <h1>Secret</h1>
        <p>{this.state.message}</p>
      </div>
    )
  }
}
