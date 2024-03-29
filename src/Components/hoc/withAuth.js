import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


// To autherize the user based on he is log in or not
export default function withAuth (ComponentInside) {
  return class extends Component {
    constructor () {
      super()
      this.state = {
        loading: true,
        redirect: false
      }
    }
    componentDidMount () {
      fetch('https://intnapi.herokuapp.com/checkToken', {
        credentials: 'include',
        headers: { 'x-access-token': localStorage.getItem('token') }
      })
        .then(res => {
          // If some error occuerd
          if (res.status === 200) {
            this.setState({ loading: false })
          } else {
            const error = new Error(res.error)
            throw error
          }
        })
        .catch(err => {
          console.error(err)
          this.setState({ loading: false, redirect: true })
        })
    }

    render () {
      const { loading, redirect } = this.state
      if (loading) {
        return null
      }
      // Redirected to log in page, if not logged in
      if (redirect) {
        return <Redirect to='/login' />
      }
      return <ComponentInside {...this.props} />
    }
  }
}
