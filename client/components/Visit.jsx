/**
 * ***********************************
 *
 * @module Visit
 * @author Austin Ruby
 * @date 10/13/2019
 * @description functional component that displays
 * one visit from the current activePet
 *
 * ***********************************
 */

import React from 'react';

const Visit = (props) => {
  const { visit } = props;

  return (
    <li className={`"visit-${visit.id}"`}>
      <p className="date">{visit.date}</p>
      <p className="notes">{visit.notes}</p>
    </li>
  );
};

export default Visit;
