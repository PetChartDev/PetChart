/**
 * ***********************************
 *
 * @module Nav
 * @author Austin Ruby and Michael Evans
 * @date 10/12/2019
 * @description functional component that displays
 * navigation options once a user logs in
 *
 * ***********************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PetNameButton from './PetNameButton.jsx';

const Nav = (props) => {
  console.log('Nav props: ', props);
  // console.log('Nav petNavDetails: ', props.petNavDetails);
  const petButtons = [];
  props.pets.forEach((petObj, i) => {
    // console.log(petObj);
    petButtons.push(<PetNameButton activatePet={props.activatePet} petId={petObj.id} petName={petObj.name} key={`petNav${i}`} />);
  });
  // console.log(petButtons);
  return (
    <div className="nav-bar">
    Hello,
      {' '}
      {props.owner}
      <button type="button" className="ant-btn ant-btn-primary ant-btn-round" onClick={() => props.changeDBPage('home')}>Home</button>
      <button type="button" className="ant-btn ant-btn-danger ant-btn-round" onClick = { () => props.logoutUser()}>Logout</button>
      {petButtons}
    </div>
  );
};

export default Nav;
