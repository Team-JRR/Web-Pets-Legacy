
import React from 'react';

const ScreenView = ({ pet }) => {
  const entries = Object.entries(pet);
  return (
    <div style={{ border: '5px inset hotpink', height: '360px', margin: '5px', backgroundColor: 'lavender' }}>
      this is the screen - kitty goes here
    </div>
  );
};

export default ScreenView;
