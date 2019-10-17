/**
 * ***********************************
 *
 * @module Home
 * @author Austin Ruby and Michael Evans
 * @date 10/12/2019
 * @description functional component that displays
 * a user's pets and the option to create a new pet
 * within the Dashboard
 *
 * ***********************************
 */

import React from 'react';

import PetNameButton from './PetNameButton.jsx';
import emptyPet from '../constants/emptyPetObj';

const Home = (props) => {
  console.log('homeprops', props);

  const petButtons = [];
  props.pets.forEach((petObj, i) => {
    // console.log(petObj);
    petButtons.push(<PetNameButton activatePet={props.activatePet} petId={petObj.id} petName={petObj.name} key={`petNav${i}`} />);
  });
  return (
    <div className="home-container">
      <div className="home-wrapper">
        HomePage
        {petButtons}
        <button type="button" className="ant-btn ant-btn-default ant-btn-round" onClick={() => props.changeDBPage('profile', emptyPet)}>Add a Pet</button>
      </div>
    </div>
  );
};

export default Home;
