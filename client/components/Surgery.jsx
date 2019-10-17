/**
 * ***********************************
 *
 * @module Surgery
 * @author Austin Ruby
 * @date 10/13/2019
 * @description functional component that displays
 * one surgery from the current activePet
 *
 * ***********************************
 */

import React from 'react';

const Surgery = (props) => {
  const { surgery } = props;

  return (
    <li className={`"surgery-${surgery.id}"`}>
      <p className="date">{surgery.date}</p>
      <p className="notes">{surgery.name}</p>
    </li>
  );
};

export default Surgery;
