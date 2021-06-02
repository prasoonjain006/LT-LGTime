import React, { Component } from 'react'


//for posting the  data
// user longitude and latitude will get stored.
export default class Post extends Component {
  constructor () {
    super()
    this.state = {
      long: '',
      lat: '',
      st: ''
    }
  }

  // Function to handle the change when email or paasword is entered
  handleInputChange = e => {
    const { value, name } = e.target
    this.setState({
      [name]: value
    })
  }

  // on submit, calls the post api
  onSubmit = e => {
    e.preventDefault()
    fetch('https://intnapi.herokuapp.com/post', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    })
    // check if user is sign in or not, If not create an alert
      .then(function (res) {
        console.log(res.status)
        if (res.status === 401) {
          alert('Please Sign in First')
        }
        if (res.status === 200) {
          alert('SucessFully Posted the text')
        }
        res.json()
      })
      .then(user_token => {

        // If everything is working get the user token, and allows 
        // user to post the data
        let { token } = user_token
        localStorage.setItem('token', token)
        this.props.history.push('/')
      })
      .catch(err => console.log(err))
  }


  // To get longitude an latitude of the user
  // Javascript API is used
  componentDidMount () {
    const success = position => {
      console.log('Latitude is :', position.coords.latitude)
      console.log('Longitude is :', position.coords.longitude)
      const ll1 = position.coords.latitude
      const ll2 = position.coords.longitude
      this.setState({
        lat: ll1,
        long: ll2
      })
    }
    navigator.geolocation.getCurrentPosition(success)
  }

  render () {
    return (

     // Ask user to enter text for creating the post. 
     // Longitude and latitude fields are hidden, as we are fetcing them
     // using Javascript API. 
      <form onSubmit={this.onSubmit}>
        <h1>Post</h1>
        <input
          type='hidden'
          autoComplete='true'
          name='long'
          placeholder='Enter Long'
          value={this.state.long}
          onChange={this.handleInputChange}
        ></input>
        <input
          type='hidden'
          autoComplete='true'
          name='long'
          placeholder='Enter Lat'
          value={this.state.lat}
        ></input>
        <input
          type='text'
          autoComplete='true'
          name='st'
          placeholder='Enter anything'
          value={this.state.st}
          onChange={this.handleInputChange}
        ></input>

        <input type='submit' value='Post' />
      </form>
    )
  }
}
