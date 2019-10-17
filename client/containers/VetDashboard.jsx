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

const mapStateToProps = (state) => ({
  userProfile: state.app.userProfile,
  dashboardPage: state.app.dashboardPage,
  activePet: state.app.activePet,
  appPage: state.app.appPage,
});

class VetDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      customers: [],
    };
    this.getAllPets = this.getAllPets.bind(this);
    this.getAllCustomers = this.getAllCustomers.bind(this);
  }

  getAllPets() {
    fetch('/getAllPets').then((pets) => this.setState({ pets }));
  }

  getAllCustomers() {
    fetch('/getAllPets').then((customers) => this.setState({ customers }));
  }

  render() {
    let petsArray = []; const
      customersArray = [];
    for (let i = 0; i < this.state.pets.length; i += 1) {
      petsArray.push(<div>{this.state.pets[i].name}</div>);
    }
    for (let i = 0; i < this.state.customers.length; i += 1) {
      customersArray.push(<div>{this.state.customers[i].name}</div>);
    }
    if (petsArray.length === 0) petsArray = 'You suck at being a vet. You have no pets.';
    if (customersArray.length === 0) petsArray = 'You suck at being a vet. All your customers left you.';

    console.log(this.props.userProfile);
    return (
      <div>
        <div>
I'M AN UNLICENSED VET! WELCOME
          {' '}
          {this.props.userProfile.vet.firstName}
        </div>
        <input type="button" onClick={this.getAllPets} value="Get all pets" />
        <input type="button" onClick={this.getAllCustomers} value="Get all customers" />
        <div>{customersArray}</div>
        <div>{petsArray}</div>
      </div>

    );
  }
}

export default connect(mapStateToProps)(VetDashboard);
