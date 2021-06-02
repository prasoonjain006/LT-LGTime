import React, { Component } from 'react'

// Component to display all the countries name.
export default class Countries extends Component {
  constructor (props) {
    super(props)
    // Initialize state first
    this.state = {
      users: [],
      err: null,
      isLoading: false
    }
  }

  // Fetch longitude and latitude from our endpoint
  // Currently displays only long and lat, country name is not displayed
  componentDidMount () {
    this.setState({ isLoading: true })
    let api_url = 'https://intnapi.herokuapp.com/loc'
    fetch(api_url)
      .then(res => {
        if (res.status >= 400) {
          throw new Error('Server responds with error!')
        }
        return res.json()
      })
      .then(
        users => {
          this.setState({
            users,
            isLoading: false
          })
        },
        err => {
          this.setState({
            err,
            isLoading: false
          })
        }
      )
      .catch(err => console.log(err))
  }

  render () {
    // Extract states in the local variable
    let { users, err, isLoading } = this.state
    console.log(this.state.users)
    if (err) {
      // Error message
      return <div> {err.message} </div>
    }
    if (isLoading) {
      return <div> Loading... </div>
    }
    return (
      <div>
        {/* check whether the array contains data or not. */}

        {users.length > 0 ? (
          <ul>
            {users.map(user => (
              <li key={user._id}>
                Longitude : {user.long}, Latitde : {user.lat}
              </li>
            ))}
          </ul>
        ) : (
          <div> No user found! </div>
        )}
      </div>
    )
  }
}
