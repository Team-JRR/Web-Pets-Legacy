import React, { useState, useEffect } from 'react';
import axios from 'axios';





const ProfileView = ({pet}) => {
  

  return (
     <div className="border-2 border-black p-[10px]">
  
      <p><strong>Name:</strong> {pet.name}</p>
      <p><strong>Mood:</strong> {pet.mood}</p>
      <p><strong>Love:</strong> {pet.love}</p>
      <p><strong>Health:</strong> {pet.health}</p>
      <p><strong>Hunger:</strong> {pet.hunger}</p>

      <h4>Training</h4>
      <ul>
        {pet.training.map(skill => (
          <li key={skill.name}>
            {skill.name}: {skill.stat}
          </li>
        ))}
      </ul>
    </div>
  );


}

export default ProfileView;
