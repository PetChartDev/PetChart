/**
 * ************************************
 *
 * @module  appReducer
 * @author Austin Ruby and Michael Evans
 * @date 10/12/2019
 * @description reducer for app data
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';
import emptyPet from '../constants/emptyPetObj';

const dummyPet = {
  owner: {
    id: 1,
    firstName: 'Ronald',
  },
  pets: [
    {
      id: 1,
      name: 'Fido',
      type: 'dog',
      gender: 'm',
      spayed: true,
      birth_year: 2006,
      vet: 'Dr. Lewis',
      profilePic: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      visits: [ // array of 5 most recent visits (if total < 5, fill in the rest as null)
        {
          id: 1,
          date: '12/10/2018',
          notes: 'annual checkup',
          file: '???',
          vet: 'Dr. Lewis',
        },
        {
          id: 2,
          date: '6/8/2018',
          notes: 'removing plastic toy from his stomach',
          file: '???',
          vet: 'Dr. Lewis',
        },
        {
          id: 3,
          date: '12/10/2017',
          notes: 'annual checkup',
          file: '???',
          vet: 'Dr. Lewis',
        },
        {
          id: 4,
          date: '8/6/2017',
          notes: 'knee surgery',
          file: '???',
          vet: 'Dr. Lewis',
        },
        {
          id: 5,
          date: '12/10/2016',
          notes: 'annual checkup',
          file: '???',
          vet: 'Dr. Lewis',
        },
      ],
      surgeries: [ // array of 5 most recent surgeries (if total < 5, fill in the rest as null)
        {
          id: 1,
          name: 'knee surgery',
          date: '8/6/2017',
          vet: 'Dr. Lewis',
        },
        {
          id: 2,
          name: 'neutering',
          date: '11/19/2007',
          vet: 'Dr. Schwartz',
        },
        null,
        null,
        null,
      ],
      vaccines: [ // array of 5 most recent vaccines (if total < 5, fill in the rest as null)
        {
          id: 1,
          name: 'influenza',
          date: '12/10/2018',
        },
        {
          id: 2,
          name: 'anti-worms',
          date: '7/31/2014',
        },
        null,
        null,
        null,
      ],
    },
    {
      id: 2,
      name: 'Ernie',
      type: 'cat',
      gender: 'm',
      spayed: true,
      birth_year: 2007,
      vet: 'Dr. Palmer',
      profilePic: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      visits: [ // array of 5 most recent visits (if total < 5, fill in the rest as null)
        {
          id: 1,
          date: '12/10/2018',
          notes: 'annual checkup',
          file: '???',
          vet: 'Dr. Lewis',
        },
        {
          id: 2,
          date: '6/8/2018',
          notes: 'removing plastic toy from his stomach',
          file: '???',
          vet: 'Dr. Lewis',
        },
        {
          id: 3,
          date: '12/10/2017',
          notes: 'annual checkup',
          file: '???',
          vet: 'Dr. Lewis',
        },
        {
          id: 4,
          date: '8/6/2017',
          notes: 'knee surgery',
          file: '???',
          vet: 'Dr. Lewis',
        },
        {
          id: 5,
          date: '12/10/2016',
          notes: 'annual checkup',
          file: '???',
          vet: 'Dr. Lewis',
        },
      ],
      surgeries: [ // array of 5 most recent surgeries (if total < 5, fill in the rest as null)
        {
          id: 1,
          name: 'knee surgery',
          date: '8/6/2017',
          vet: 'Dr. Lewis',
        },
        {
          id: 2,
          name: 'neutering',
          date: '11/19/2007',
          vet: 'Dr. Schwartz',
        },
        null,
        null,
        null,
      ],
      vaccines: [ // array of 5 most recent vaccines (if total < 5, fill in the rest as null)
        {
          id: 1,
          name: 'influenza',
          date: '12/10/2018',
        },
        {
          id: 2,
          name: 'anti-worms',
          date: '7/31/2014',
        },
        null,
        null,
        null,
      ],
    },
  ],
};

const initialState = {
  appPage: 'login',
  dashboardPage: 'home',
  ownerName: null,
  userProfile: null,
  activePet: emptyPet,
};


const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PUBLIC_PAGE:

      const newPage = action.payload;

      return {
        ...state,
        appPage: newPage,
      };

    case types.LOGOUT:

      return {
        ...state,
        ...initialState,
      };

    case types.CHANGE_DB_PAGE: {
      console.log('change db page successful');
      const { dashboardPage, activePet } = action.payload;
      return ({
        ...state,
        dashboardPage,
        activePet,
      });
    }
    case types.SAVE_PET: {
      console.log('save pet successful: ', action.payload);
      const responsePet = action.payload;
      // copy pets array from state
      const { userProfile } = state;
      // spread empty pet object and overwrite with server response in action payload
      const newPet = {
        ...emptyPet,
        ...responsePet,
      };
      userProfile.pets.push(newPet);
      // still need to update state once server response is update by Mike R
      console.log('pets array: ', userProfile.pets, 'newPet: ', newPet);
      return {
        ...state,
        userProfile,
      };
    }

    case types.UPDATE_PET: {
      console.log('updated pet:', action.payload);
      const responsePet = action.payload;

      const { userProfile } = state;

      let newProfile = Object.assign({}, userProfile);
      
      newProfile.pets = newProfile.pets.map((pet, idx) => {
        if (idx === responsePet.id) {
          let nameUpdate, typeUpdate, birthUpdate, genderUpdate, spayedUpdate;
          responsePet.name !== "" ? nameUpdate = responsePet.name : nameUpdate = pet.name;
          responsePet.type !== "" ? typeUpdate = responsePet.type : typeUpdate = pet.type;
          responsePet.birthYear !== "" ? birthUpdate = responsePet.birthYear : birthUpdate = pet.birthYear;
          responsePet.gender !== "" ? genderUpdate = responsePet.gender : genderUpdate = pet.gender;
          responsePet.spayed !== "" ? spayedUpdate = responsePet.spayed : spayedUpdate = pet.spayed;
          return {
            ...pet,
            name: nameUpdate,
            type: typeUpdate,
            birthYear: birthUpdate,
            gender: genderUpdate,
            spayed: spayedUpdate,
          }
        }
        return pet;
      })

      return {
        ...state,
        userProfile: newProfile,
      }
    }

    case types.UPDATE_ACTIVE_PET: {
      console.log('updated pet:', action.payload);
      const responsePet = action.payload;

      const { activePet } = state;

      let newActivePet = Object.assign({}, activePet);

      let nameUpdate, typeUpdate, birthUpdate, genderUpdate, spayedUpdate;
      responsePet.name !== "" ? nameUpdate = responsePet.name : nameUpdate = activePet.name;
      responsePet.type !== "" ? typeUpdate = responsePet.type : typeUpdate = activePet.type;
      responsePet.birthYear !== "" ? birthUpdate = responsePet.birthYear : birthUpdate = activePet.birthYear;
      responsePet.gender !== "" ? genderUpdate = responsePet.gender : genderUpdate = activePet.gender;
      responsePet.spayed !== "" ? spayedUpdate = responsePet.spayed : spayedUpdate = activePet.spayed;
      
      newActivePet.name = nameUpdate;
      newActivePet.type = typeUpdate;
      newActivePet.birthYear = birthUpdate;
      newActivePet.gender = genderUpdate;
      newActivePet.spayed = spayedUpdate;

  
      // newActivePet.visits = responsePet.visits 
      // newActivePet.vaccines = responsePet.vaccines
      // newActivePet.surgeries = responsePet.surgeries
      
      return {
        ...state,
        activePet: newActivePet,
      }
    }
      
    case types.ADD_VISIT: {
      const responseVisit = action.payload;

      const newUserProfile = Object.assign({}, state.userProfile);

      for (let i = 0; i < newUserProfile.pets.length; i += 1){
        if (newUserProfile.pets[i].id === responseVisit.pet_id) {
          console.log("matched the pet id");
          newUserProfile.pets[i].visits.push(responseVisit);
        }
      }

      return {
        ...state,
        userProfile: newUserProfile,
      };
    }

    case types.ADD_VACCINE: {
      const responseVaccine = action.payload;

      const newUserProfile = Object.assign({}, state.userProfile);

      for (let i = 0; i < newUserProfile.pets.length; i += 1){
        if (newUserProfile.pets[i].id === responseVaccine.pet_id) {
          console.log("matched the pet id");
          newUserProfile.pets[i].vaccines.push(responseVaccine);
        }
      }

      return {
        ...state,
        userProfile: newUserProfile,
      };
    }

    case types.ADD_SURGERY: {
      const responseSurgery = action.payload;

      const newUserProfile = Object.assign({}, state.userProfile);

      for (let i = 0; i < newUserProfile.pets.length; i += 1){
        if (newUserProfile.pets[i].id === responseSurgery.pet_id) {
          console.log("matched the pet id");
          newUserProfile.pets[i].surgeries.push(responseSurgery);
        }
      }

      return {
        ...state,
        userProfile: newUserProfile,
      };
    }

    case types.DELETE_PET: {
      const petID = action.payload;

      const newUserProfile = Object.assign({}, state.userProfile);

      for (let i = 0; i < newUserProfile.pets.length; i += 1){
        if (newUserProfile.pets[i].id === petID) {
          console.log("matched the pet id");
          delete newUserProfile.pets[i];
        }
      }

      return {
        ...state,
        userProfile: newUserProfile,
        dashboardPage: 'home'
      };
    }

    case types.SAVE_PROFILE:

      // alert('user profile loaded!')

      const userProfile = action.payload;

      return {
        ...state,
        // @todo: removed the dashboard appPage in state and moved it to Main Container.
        // expect to get an additional variable in response to the MainContainer fetch request
        // that will state "vet" or "owner" to conditionally render those pages
        userProfile,
      };

    default:
      return state;
  }
};

export default appReducer;
