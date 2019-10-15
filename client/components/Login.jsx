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

import React, {Component} from 'react';

//return content to render for the login page
const Login = (props) => {
  
  return (
    <div>
      {/* login form: */}
      <form id = "loginForm" onSubmit = { (event) => props.saveProfile(event)} >
        <label> Email: </label>
        <input type="input" required id = "email"></input>
        <br />
        <label> Password: </label>
        <input type="password" required id = "password"></input>
        <br />
        <label><input type="radio" required name="role" value="Owner" />Owner</label>
        <label><input type="radio" required name="role" value="Vet" />Vet</label>
        <br />
        <input type="submit" value="Login"></input>
        <input type="button" value="Go to Signup" onClick = { () => props.publicPage("signup")} ></input>
      </form>
      
    </div>
  )
}


export default Login;
