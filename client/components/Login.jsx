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
      .then((response) => (response.json()
        .then((json) => ({
          session: response.headers.get('session'),
          body: json,
        }))))
      .then((responseObj) => {
        console.log('responseObj: ', responseObj);
        const { session } = responseObj;
        const parsedResp = responseObj.body;
        console.log('just got parsed: ', parsedResp);
        const userProfile = {
          owner: parsedResp.owner,
          pets: parsedResp.pets,
          role: 'Owner',
        };
        console.log('line 26 session: ', session);
        if (session === 'true') {
          console.log('ciao', this.props);
          this.props.createUserProfile(userProfile);
          this.props.publicPage('dashboard');
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
          <input className="ant-btn ant-btn-primary ant-btn-round" type="submit" value="Login" />
          <input className="ant-btn ant-btn-danger ant-btn-round" type="button" value="Go to Signup" onClick={() => this.props.publicPage('signup')} />
        </form>

      </div>
    );
  }
}


export default Login;
