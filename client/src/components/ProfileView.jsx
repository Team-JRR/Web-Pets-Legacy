import React, { useState, useEffect } from 'react';


const ProfileView = ({pet, archivedPets}) => {


  return (
     <div className="flex gap-4 border-2 p-[10px]">

      <div className="flex-1">
      <h3 className='font-bold mb-2'>Current Pet</h3>
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

      <hr />
       <div className="flex-1 border-1 pl-4">
      <h3 className='font-bold mb-2'>Archived Pets</h3>
      {archivedPets.map(pet => (
        <div key={pet._id} className="mb- 2 border p-2">
      <p><strong>Name:</strong> {pet.name}</p>
      <p><strong>Love:</strong> {pet.love}</p>
      <p className="text-sm"><strong>Archived: </strong>{Date(pet.archiveAt)}</p>
    </div>
    ))}
    </div>
   </div>
  )


}

export default ProfileView;
