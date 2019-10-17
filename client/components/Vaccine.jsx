/**
 * ***********************************
 *
 * @module Vaccine
 * @author Austin Ruby
 * @date 10/13/2019
 * @description functional component that displays
 * one vaccine from the current activePet
 *
 * ***********************************
 */

import React from 'react';

const Vaccine = (props) => {
  const { vaccine } = props;

  return (
    <li className={`"vaccine-${vaccine.id}"`}>
      <p className="date">{vaccine.date}</p>
      <p className="notes">{vaccine.name}</p>
    </li>
  );
};

export default Vaccine;
