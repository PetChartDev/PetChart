/**
 * ***********************************
 *
 * @module PetNameButton
 * @author Austin Ruby
 * @date 10/13/2019
 * @description functional component that displays
 * a pet's name within the Nav component and activates
 * the pet's profile on being clicked
 *
 * ***********************************
 */

import React from 'react';

const petNameButton = (props) => (
  <button id={props.petId} type="button" className="ant-btn ant-btn-primary ant-btn-round" onClick={(event) => props.activatePet(event)}>{props.petName}</button>
);

export default petNameButton;
