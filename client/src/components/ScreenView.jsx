import {useState, useEffect} from 'react'
import React from 'react';
import axios from 'axios';

const ScreenView = ({pet}) => {
 // see what pet is first - it is a pet object


 const petChecker = () => {
    // we want to see if pet.petName is empty or not
  if(pet.petName === '') {
    // then we want to promt the user to create a pet
    // which can fall in line with the submit button

  } else {
    // just show the pet data for the user - USER HAS A PET

  }
 };
 petChecker();
  const handleSubmit = () => {
    axios.post('/pet', {petName: 1})
      .catch((err) => {
        console.error(err, 'coming from dummyPet');
      });
  };


  return (
    <div style={{ border: '5px inset hotpink', height: '360px', margin: '5px', backgroundColor: 'lavender' }}>
      this is the screen - kitty goes here
        <input type='text'/>
        <button>Submit</button>
    </div>
  );
};

export default ScreenView;
