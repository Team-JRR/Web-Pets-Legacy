
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ScreenView from './ScreenView';
import DashboardView from './Dashboard/DashboardView';

const DeviceView = ({user}) => {
  const [ pet, setPet ] = useState(null);
  const [ message, setMessage ] = useState('');
  const [ availableSkills, setAvailableSkills ] = useState([]);
  const [ behaviors, setBehaviors ] = useState([]);

  // const cssTest = {
  //   backgroundColor: 'pink',
  //   borderRadius: '20px',
  //   margin: '20px',
  //   padding: '10px',
  // };

  const deviceStyles = [
    'bg-[lightSkyBlue]', // background color
    'rounded-lg', // border radius
    'm-[20px]', // margin
    'p-[15px]', // padding
  ];

  const initPet = () => {
    if (user.name) {
      axios.get('/init')
        .then(({ data }) => {
          //TODO: add weather data once finished
          if (!data) {
            setPet(null);
            setBehaviors([]);
            setAvailableSkills([]);
          } else {
            const { pet, behaviors, available } = data;
            setPet(pet);
            setBehaviors(behaviors);
            setAvailableSkills(available);
          }
        })
        .catch((error) => {
          console.error('Failed to GET initial pet data:', error);
        });
    } else {
      setPet(null);
      setBehaviors([]);
      setAvailableSkills([]);
    }
  };

  const refreshPet = () => {
    if (user.name) {
      axios.get('/pet')
      .then(({ data }) => {
        if(!data) {
          setPet(null);
        } else {
          setPet(data);
        }
      })
      .catch(err => {
        console.error('Could not get pet on client: ', err);
      });
    } else {
      setPet(null);
    }
  };

  useEffect(initPet, [user.name]);

  const refreshSkillData = function(updateTrainingData = true) {
    axios.get('/training/')
      .then(({ data: { training, available, behaviors } }) => {
        // if the whole pet object has just been fetched, (e.g. on login),
        // there's no need to update pet.training and risk some sort of state conflict
        if (updateTrainingData) {
          setPet({
            ...pet,
            training
          });
        }
        setAvailableSkills(available);
        setBehaviors(behaviors);
      })
      .catch((error) => {
        console.error('Failed to get pet skill data:', error);
      });
  };

  const displayMessage = function(message) {
    setMessage(message);
  };

  // the skills dashboard doesn't actually have access to the pet's name
  const behaviorMessage = function(behavior) {
    displayMessage(`${pet.name} ${behavior}`);
  };

  // add a delete button
  const deletePet = () => {
    axios.delete('/pet')
      .then(() => {
        refreshPet();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [name, setName] = useState('');
  // update petname
  const changePetName = () => {
    axios.patch('/pet', {name})
      .then(() => {
        refreshPet();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div id="device" className={ deviceStyles.join(' ') }>
      <div className="relative">
        <div className="absolute right-[50px] bottom-[-29px]">
          <button onClick={deletePet}>Delete Pet</button>
          <div>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
            <button onClick={changePetName}>Submit</button>
          </div>
        </div>
      </div>
      this is the device :D
      <ScreenView
        pet={ pet }
        user = {user}
        message={message}
        initPet={initPet}
      />
      <DashboardView
        pet={pet}
        user={user}
        availableSkills={availableSkills}
        behaviors={behaviors}
        behaviorMessage={behaviorMessage}
        refreshSkillData={refreshSkillData}
        refreshPet={refreshPet}
      />
    </div>
  );
};

export default DeviceView;

