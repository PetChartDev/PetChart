/**
 * ***********************************
 *
 * @module Dashboard
 * @author Rajeeb Banstola and Brian Haller
 * @date 10/15/2019
 * @description stateful component that renders
 * nav bar and landing page for vets
 *
 * ***********************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';

import Home from '../components/Home.jsx';
import Nav from '../components/Nav.jsx';
import Profile from '../components/Profile.jsx';

class VetDashboard extends Component {
  constructor(props) {
    super(props);

  }

  render () {
    return (
      <div>I'M AN UNLICENSED VET!</div>
    );
  }
}

export default VetDashboard;