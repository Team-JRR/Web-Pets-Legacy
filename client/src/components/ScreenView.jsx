import { useState } from 'react';
import React from 'react';
import axios from 'axios';

const ScreenView = ({ pet }) => {
  const [petName, setPetName] = useState('');
  const handleSubmit = () => {
    if(petName === '') {
      // if the user doesn't enter anything the button does nothing
      return;
    }
    axios.post('/pet', { petName }) // fix
      .catch((err) => {
        console.error(err, 'coming from dummyPet');
      });
  };

  const renderScreenContents = () => {
    if (pet !== null) {
      return (
        <div>
          <p>{pet.petName}</p>
        </div>
      );
    } else {
      return (
        <div>
          <input type='text' value={petName} onChange={(e) => setPetName(e.target.value)}/>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      );
    }
  };

  // this is for if the user does not have a pet
  return (
    <div style={{ border: '5px inset hotpink', height: '360px', margin: '5px', backgroundColor: 'lavender' }}>
      this is the screen - kitty goes here
      {renderScreenContents()}
    </div>
  );
};

export default ScreenView;
