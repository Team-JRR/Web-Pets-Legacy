
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ScreenView from './ScreenView';
import DashboardView from './Dashboard/DashboardView';

const DeviceView = () => {
  const [ pet, setPet ] = useState(
    {
      petName: '',
      health: 0,
      love: 0,
      mood: 0,
      behaviors: [],
      training: [],
    }
  );

  const cssTest = {
    backgroundColor: 'pink',
    borderRadius: '20px',
    margin: '20px',
    padding: '10px',
    height: '520px',
    width: 'auto',
  };

  useEffect(() => {
    axios.get('/pet')
      .then(({ data }) => {
        setPet(data); 
      })
      .catch(err => {
        console.error('Could not get pet on client: ', err);
      });
  }, []);

  return (
    <div id="device" style={cssTest}>
      this is the device :D
      <ScreenView pet={ pet } />
      <DashboardView />
    </div>
  );
};

export default DeviceView;
