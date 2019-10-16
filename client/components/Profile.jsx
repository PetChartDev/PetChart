/**
 * ***********************************
 *
 * @module Profile
 * @author Austin Ruby and Michael Evans
 * @date 10/12/2019
 * @description functional component that displays
 * a specific pet's profile info and allows the user
 * to modify that information
 *
 * ***********************************
 */

import React, { Component } from 'react';

import Visit from './Visit.jsx';
import Vaccine from './Vaccine.jsx';
import Surgery from './Surgery.jsx';

// Ant Design
// import { DatePicker } from 'antd';
// import 'antd/dist/antd.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.updatePetDetails = this.updatePetDetails.bind(this);
    this.addVisit = this.addVisit.bind(this);
    this.addVaccine = this.addVaccine.bind(this);
    this.addSurgery = this.addSurgery.bind(this);
  }

  // grab updated/newly added pet details
  // POST/PATCH to server
  // dispatch savePet action with response
  updatePetDetails(event) {
    event.preventDefault();
    const form = document.querySelector('.pet-profile-details-form');
    const name = form.name.value;
    const type = form.type.value;
    const birthYear = form.birthyear.value;
    const gender = form.gender.value;
    const spayed = form.spayed.value;
    const { ownerID } = this.props;
    const petID = this.props.activePet.id;
    // @todo: include vetID in the props and pass it along
    let method = 'POST'; 
    let petProfile = {
      name,
      type,
      birthYear,
      gender,
      spayed,
      ownerID,
    };
    if (petID) {
      petProfile = Object.assign(petProfile, { petID: petID });
      method = 'PATCH'
    }

    fetch('/pets/', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pet: petProfile }),
    })
      .then((response) => response.json())
      .then((petObject) => {
        console.log(petObject);
        this.props.updatePet(petObject);
      })
      .catch((err) => console.log(err));
  }

  // grab visit details from form
  // PATCH to server
  // dispatch savePet action with response
  addVisit(event) {
    event.preventDefault();
    const form = document.querySelector('.visit-form');
    const date = form.date.value;
    const notes = form.notes.value;
    const visitDetails = {
      petID: this.props.activePet.id,
      date,
      notes,
    };
    
    fetch('/visits/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ visit: visitDetails }),
    })
      .then((response) => response.json())
      .then((visitDetailsObj) => {
        console.log(visitDetailsObj);
        this.props.addVisitToState(visitDetailsObj);
      })
      .catch((err) => console.log(err));
  }

  // grab vaccine details from form
  // PATCH to server
  // dispatch savePet action with response
  addVaccine(event) {
    event.preventDefault();
    const form = document.querySelector('.vaccine-form');
    const date = form.date.value;
    const name = form.name.value;
    const vaccineDetail = {
      pet_id: this.props.activePet.id,
      date,
      name,
    };

    fetch('/vaccines/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vaccine: vaccineDetail }),
    })
      .then((response) => response.json())
      .then((vaccineDetailsObj) => {
        console.log(vaccineDetailsObj);
        this.props.addVaccineToState(vaccineDetailsObj);
      })
      .catch((err) => console.log(err));
  }

  // grab surgery details from form
  // PATCH to server
  // dispatch savePet action with them
  addSurgery(event) {
    event.preventDefault();
    const form = document.querySelector('.surgery-form');
    const date = form.date.value;
    const name = form.name.value;
    const surgeryDetail = {
      petID: this.props.activePet.id,
      date,
      name,
    };
    
    fetch('/surgeries/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ surgery: surgeryDetail }),
    })
      .then((response) => response.json())
      .then((surgeryDetailsObj) => {
        console.log(surgeryDetailsObj);
        this.props.addSurgeryToState(surgeryDetailsObj);
      })
      .catch((err) => console.log(err));
  }

  render() {
    console.log(this.props);
    const { activePet } = this.props;
    // console.log(activePet.name);

    const visitsListItems = [];
    const vaccinesListItems = [];
    const surgeriesListItems = [];

    let buttonText = 'Save Pet';
    let formHeaderText = 'Add New Pet';
    if (activePet.id) {
      buttonText = 'Update Pet';
      formHeaderText = 'Update Pet Information';
    }
    // if activePet exists, generate arrays of Visit, Vaccine, and Surgery components
    if (activePet.id) {
      for (let i = 0; i < 5; i += 1) {
        if (activePet.visits[i]) {
          visitsListItems.push(<Visit visit={activePet.visits[i]} key={`visit-${i}`} />);
        }
        if (activePet.vaccines[i]) {
          vaccinesListItems.push(<Vaccine vaccine={activePet.vaccines[i]} key={`vaccine-${i}`} />);
        }
        if (activePet.surgeries[i]) {
          surgeriesListItems.push(<Surgery surgery={activePet.surgeries[i]} key={`surgery-${i}`} />);
        }
      }
    }

    return (
      <div className="profile-container">
        <section className="profile-header">
          <div className="img-name">
            <img src={`/uploads/pet${activePet.id}.png`} alt="pet profile pic" />
            <h1>{activePet.name}</h1>
          </div>
          <div className="pet-profile-details-container">
            <form className="pet-profile-details-form">
             {formHeaderText} :
              {' '}
              <br />
              <label>
                Name:
                <input type="text" name="name" id="pet-name-input" />
              </label>
              <label>
                Type:
                <input type="text" name="type" id="pet-type-input" />
              </label>
              <label>
                Birth Year:
                <input type="text" name="birthyear" id="pet-birth-year-input" />
              </label>
              <label>
                Gender:
                <input type="text" name="gender" id="pet-gender-input" />
              </label>
              <label>
                Spayed/Neutered?
                <input type="text" name="spayed" id="pet-spayed-input" />
              </label>
              <input type="submit" value={buttonText} onClick={this.updatePetDetails} />
            </form>
            <form action={`/uploadImg/${this.props.activePet.id}`} method="post" encType="multipart/form-data">
              <input type="file" name="avatar" />
              <input type="hidden" id="petID" name="petID" value={this.props.activePet.id} />
              <input type="submit"  name="LOAD" />
            </form>
            <ul className="pet-profile-details">
              <li>
                Born:
                {' '}
                {activePet.birthYear}
              </li>
              <li>
                Gender:
                {' '}
                {activePet.gender}
              </li>
              <li>
                Neutered:
                {' '}
                {activePet.spayed ? activePet.spayed.toString() : null}
              </li>
            </ul>
          </div>
        </section>
        { this.props.activePet.id ? 
        <section className="profile-body">
          <div className="visits-container">
            <h3>Visits</h3>
            <form className="visit-form">
              Add a visit
              {' '}
              <br />
              <label>
                Date:
                <input type="text" name="date" id="visit-date-input" />
              </label>
              <label>
                Notes:
                <input type="text" name="notes" id="visit-notes-input" />
              </label>
              <input type="submit" value="Save Visit" onClick={this.addVisit} />
            </form>
            <ul className="visits">
              {visitsListItems}
            </ul>
            </div>
          <div className="vaccines-container">
            <h3>Vaccines</h3>
            <form className="vaccine-form">
              Add a vaccine
              {' '}
              <br />
              <label>
                Date:
                <input type="text" name="date" id="vaccine-date-input" />
              </label>
              <label>
                Name:
                <input type="text" name="name" id="vaccine-name-input" />
              </label>
              <input type="submit" value="Save Vaccine" onClick={this.addVaccine} />
            </form>
            <ul className="vaccines-list">
              {vaccinesListItems}
            </ul>
          </div>
          <div className="surgeries-container">
            <h3>Surgeries</h3>
            <form className="surgery-form">
              Add a surgery
              {' '}
              <br />
              <label>
                Date:
                <input type="text" name="date" id="surgery-date-input" />
              </label>
              <label>
                Name:
                <input type="text" name="name" id="surgery-name-input" />
              </label>
              <input type="submit" value="Save Surgery" onClick={this.addSurgery} />
            </form>
            <ul className="surgeries-list">
              {surgeriesListItems}
            </ul>
          </div>
        </section>
        : <div></div> }
        <button type="button" onClick={() => this.props.changeDBPage('home')}>Home</button>
      </div>
    );
  }
}

export default Profile;