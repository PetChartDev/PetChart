import * as actions from '../client/actions/actions';
import * as types from '../client/constants/actionTypes';

describe('login', () => {
  it('should create an action with the user\'s input email and password', () => {
    const email = 'moishe@yeshiva.edu';
    const password = 'iluvpork16';
    const expectedAction = {
      type: types.LOGIN,
      payload: {
        email,
        password,
      },
    };
    expect(actions.login(email, password)).toEqual(expectedAction);
  });
});

describe('logout', () => {
  it('should create an action to change publicPage to "login" ', () => {
    const payload = 'login';
    const expectedAction = {
      type: types.LOGOUT,
      payload,
    };
    expect(actions.logout(payload)).toEqual(expectedAction);
  });
});

describe('signupOwner', () => {
  it('should create an action with the pet owner\'s first name, last name, email, and password ', () => {
    const firstName = 'Shlomo';
    const lastName = 'Saperstein';
    const email = 'imtired@hotmail.com';
    const password = 'oyvey!';
    const expectedAction = {
      type: types.SIGNUP_OWNER,
      payload: {
        firstName,
        lastName,
        email,
        password,
      },
    };
    expect(actions.signupOwner(firstName, lastName, email, password)).toEqual(expectedAction);
  });
});

describe('signupVet', () => {
  it('should create an action with the vet\'s first name, last name, email, password, and location', () => {
    const firstName = 'Shlomo';
    const lastName = 'Saperstein';
    const email = 'imtired@hotmail.com';
    const password = 'oyvey!';
    const vetPractice = 'SaPETstein\'s';
    const expectedAction = {
      type: types.SIGNUP_VET,
      payload: {
        firstName,
        lastName,
        email,
        password,
        vetPractice,
      },
    };
    expect(actions.signupVet(firstName, lastName, email, password, vetPractice)).toEqual(expectedAction);
  });
});

describe('changePublicPage', () => {
  it('should create an action with a payload of the passed in string', () => {
    const payload = 'fucccccccccccc';
    const expectedAction = {
      type: types.PUBLIC_PAGE,
      payload,
    };
    expect(actions.changePublicPage(payload)).toEqual(expectedAction);
  });
});

describe('changeDBPage', () => {
  it('should create an action to change dashboard page ', () => {
    const dashboardPage = 'login';
    const activePet = 'fido';
    const expectedAction = {
      type: types.CHANGE_DB_PAGE,
      payload: {
        dashboardPage,
        activePet,
      },
    };
    expect(actions.changeDBPage(dashboardPage, activePet)).toEqual(expectedAction);
  });
});

describe('savePet', () => {
  it('should create an action to save pet ', () => {
    const payload = 'savePet';
    const expectedAction = {
      type: types.SAVE_PET,
      payload,
    };
    expect(actions.savePet(payload)).toEqual(expectedAction);
  });
});

describe('saveProfile', () => {
  it('should create an action to save profile ', () => {
    const payload = 'Dr. Paul Lee Oswald Van Hammershore';
    const expectedAction = {
      type: types.SAVE_PROFILE,
      payload,
    };
    expect(actions.saveProfile(payload)).toEqual(expectedAction);
  });
});
