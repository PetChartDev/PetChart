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
import { PageHeader, Button, Form, Row, Descriptions, Col } from "antd";
import 'antd/dist/antd.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.updatePetDetails = this.updatePetDetails.bind(this);
    this.addVisit = this.addVisit.bind(this);
    this.addVaccine = this.addVaccine.bind(this);
    this.addSurgery = this.addSurgery.bind(this);
    this.deletePet = this.deletePet.bind(this);
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
        if (method === 'PATCH') {
          this.props.updatePet(petObject);
          this.props.updateActivePet(petObject) 
        } else {
          this.props.savePet(petObject);
          this.props.updateActivePet(petObject);
        }
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
        console.log("VACCINE RETURN FROM CONTROLLER", vaccineDetailsObj);
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

  deletePet () {
    fetch('/pets/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({petID: this.props.activePet.id})
    }).then(res => res.json())
    .then((removePetId) => this.props.deletePetFromState(removePetId));
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

    // Design
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 14}
    }

    return (
      <div className="profile-container">
      
        <section className="profile-header">
          {this.props.activePet.name ?
            <div>
            <PageHeader
              title={activePet.name}
              style={{
                border: "1px solid rgb(235, 237, 240)"
              }}
              tags={[
                <div>
                  <Button key="edit-1" shape="round" type="default">Edit Pet</Button>
                  {' '}
                  <Button key="delete-2" shape="round" type="danger" onClick={this.deletePet}>Delete Pet</Button>
                </div>
              ]}
            >
              <Row className="content" type="flex">
                <div className="main" style={{ flex: 1 }}>
                  <Descriptions layout="horizontal" title="Pet Details">
                    <Descriptions.Item key="description-0" label="Born">{activePet.birthYear}</Descriptions.Item>
                    <Descriptions.Item key="description-1" label="Species">{activePet.type}</Descriptions.Item>
                    <Descriptions.Item key="description-2" label="Gender">{activePet.gender}</Descriptions.Item>
                    <Descriptions.Item key="description-3" label="Neutered">{activePet.spayed ? activePet.spayed.toString() : null}</Descriptions.Item>
                    <Descriptions.Item key="description-4" label="Last Visit">{visitsListItems[0] ? visitsListItems[0].date : 'No Visit'}</Descriptions.Item>
                  </Descriptions>
                </div>
                <div
                  className="extra"
                  style={{
                    marginLeft: 80
                  }}
                >
                  <img
                    src={`/uploads/pet${activePet.id}.png`}
                    alt="Pet Profile"
                    width={200}
                  />
                </div>
              </Row>
            </PageHeader>
            <Row gutter={24}>
                <div className="details-container">
                  {visitsListItems.length != 0 ?
                    <Col span={16}>
                      <div className="visits-container">
                        <h4 className="ant-typography">Visits</h4>
                        <ul className="visits">
                          {visitsListItems}
                        </ul>
                      </div>
                    </Col>
                    : <div></div> }
                  {visitsListItems.length != 0 || surgeriesListItems != 0 ?
                    <Col span={8}>
                      <div className="vaccines-surgeries-container">
                        <div className="vaccines-container">
                          <h4 className="ant-typography">Vaccines</h4>
                          <ul className="vaccines-list">
                            {vaccinesListItems}
                          </ul>
                        </div>
                        <div className="surgeries-container">
                          <h4 className="ant-typography">Surgeries</h4>
                          <ul className="surgeries-list">
                            {surgeriesListItems}
                          </ul>
                        </div>
                      </div>
                    </Col>
                    : <div></div>}
              </div>
            </Row>
            </div>
            : <div></div>
        }
          
            <div className="pet-profile-details-container">
              <Form layout="horizontal" className="pet-profile-details-form">
                {formHeaderText} :
              {' '}
              <br />
              <Row gutter={[16, 16]}>
              <Col span={8}>
                <label>
                  Name:
                <input className="ant-input" type="text" name="name" id="pet-name-input" />
                </label>
              </Col>
              <Col span={8}>
                <label>
                  Type:
                <input className="ant-input" type="text" name="type" id="pet-type-input" />
                </label>
                </Col>
                <Col span={8}>
                <label>
                  Birth Year:
                <input className="ant-input" type="text" name="birthyear" id="pet-birth-year-input" />
                  </label>
                </Col>
                <Col span={12}>
                <label>
                  Gender:
                <input className="ant-input" type="text" name="gender" id="pet-gender-input" />
                </label>
                </Col>
                <Col span={12}>
                <label>
                  Spayed/Neutered?
                <input className="ant-input" type="text" name="spayed" id="pet-spayed-input" />
                </label>
                </Col>
                </Row>
                <Button shape="round" type="primary" onClick={this.updatePetDetails}>{buttonText}</Button>
            </Form>
            {this.props.activePet.name ?
              <form action={`/uploadImg/${this.props.activePet.id}`} method="post" encType="multipart/form-data">
                <input type="file" name="avatar" />
                <input type="hidden" id="petID" name="petID" value={this.props.activePet.id} />
                <input className="ant-btn ant-btn-primary ant-btn-round" type="submit" name="LOAD" />
              </form>
              : <div></div>}
            </div>

          </section>
         
        { this.props.activePet.name ? 
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
              <Button shape="round" type="primary" onClick={this.addVisit}>Save Visit</Button>
            </form>
            </div>
          <div className="vaccines-container">
            <h3>Vaccines</h3>
              <Form className="vaccine-form" layout="horizontal">
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
                <Button shape="round" type="primary" onClick={this.addVaccine}>Save Vaccine</Button>
            </Form>
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
                <Button shape="round" type="primary" onClick={this.addSurgery}>Save Surgery</Button>
            </form>
          
          </div>
        </section>
        : <div></div> }
      </div>
    );
  }
}

export default Profile;