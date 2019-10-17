/**
 * ***********************************
 *
 * @module Login
 * @author Austin Ruby and Michael Evans
 * @date 10/12/2019
 * @description functional component that sends
 * login info to database
 *
 * ***********************************
 */

import React, { Component } from 'react';

// return content to render for the login page
class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('about to mount');
    fetch('/plzwork')
      .then((response) => response.headers.get('session'))
      .then((session) => {
        console.log(session);
        if (session) {
          this.props.publicPage('dashboard');
          this.props.saveProfile(session);
        }
      })
      .catch((err) => console.log('fuck you: ', err));
  }

  render() {
    return (
      <div>
        {/* login form: */}
        <form id="loginForm" onSubmit={(event) => this.props.saveProfile(event)}>
          <label> Email: </label>
          <input type="input" required id="email" />
          <br />
          <label> Password: </label>
          <input type="password" required id="password" />
          <br />
          <label>
            <input type="radio" required name="role" value="Owner" />
Owner
          </label>
          <label>
            <input type="radio" required name="role" value="Vet" />
Vet
          </label>
          <br />
          <input type="submit" value="Login" />
          <input type="button" value="Go to Signup" onClick={() => this.props.publicPage('signup')} />
        </form>

      </div>
    );
  }
}


export default Login;
