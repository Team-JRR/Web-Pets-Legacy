
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ScreenView from './ScreenView';
import DashboardView from './Dashboard/DashboardView';

const DeviceView = (props) => {
  const [ pet, setPet ] = useState(null);

  const cssTest = {
    backgroundColor: 'pink',
    borderRadius: '20px',
    margin: '20px',
    padding: '10px',
  };

  useEffect(() => {
    if (props.user.name) {
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
  }, [props.user.name]);

  // const dummyPet = () => {
  //   axios.post('/pet', {petName: 'Comet'})
  //     .catch((err) => {
  //       console.error(err, 'coming from dummyPet');
  //     });
  // };
  // dummyPet();

  const refreshSkillData = function() {
    axios.get('/training')
      .then(({ data }) => {
        setPet({
          ...pet,
          training: data
        });
      })
      .catch((error) => {
        console.error('Failed to get pet skill data:', error);
      });
  };

  return (
    <div id="device" style={cssTest}>
      this is the device :D
      <ScreenView pet={ pet } />
      <DashboardView
        pet={pet}
        user={props.user}
        refreshSkillData={refreshSkillData}
      />
    </div>
  );
};

export default DeviceView;
