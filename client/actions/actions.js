/**
 * ***********************************
 *
 * @module actions.js
 * @author Austin Ruby and Michael Evans
 * @date 10/12/2019
 * @description Action Creators
 *
 * ***********************************
 */

import * as types from '../constants/actionTypes';

export const login = (email, password) => ({
  type: types.LOGIN,
  payload: {
    email,
    password,
  },
});

export const logout = (publicPage) => ({
  type: types.LOGOUT,
  payload: publicPage,
});

export const signup = (firstName, lastName, email, password) => ({
  type: types.SIGNUP,
  payload: {
    firstName,
    lastName,
    email,
    password,
  },
});

// action to navigate between login and signup pages
export const changePublicPage = (publicPage) => ({
  type: types.PUBLIC_PAGE,
  payload: publicPage,
});

export const changeDBPage = (dashboardPage, activePet) => ({
  type: types.CHANGE_DB_PAGE,
  payload: {
    dashboardPage,
    activePet,
  },
});

// petProfile is an object with information to update on pet record
export const savePet = (petProfile) => ({
  type: types.SAVE_PET,
  payload: petProfile,
});

// Update Pet Details
export const updatePet = (petProfile) => ({
  type: types.UPDATE_PET,
  payload: petProfile,
})

export const saveProfile = (userProfile) => ({
  type: types.SAVE_PROFILE,
  payload: userProfile,
});
