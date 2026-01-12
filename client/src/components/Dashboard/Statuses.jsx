import React from 'react';

/**
 * @module Statuses
 * @description
 * This component will render the status of the pet. This will display the
 * mood, love, hunger, and health. It gets this information from the database
 * based on user that is signed in.
 */
const Status = ({pet}) => {

  const { mood, love, health, hunger } = pet;
  // html
  return (
    <div>
      {pet.type === "bacteria" ? <span> Stimulation: {mood} </span> : <span> Mood: {mood} </span> } |
      <span> Love: {love} </span> |
      <span> Hunger: {hunger} </span> |
      <span> Health: {health} </span>
    </div>
  );
};

export default Status;