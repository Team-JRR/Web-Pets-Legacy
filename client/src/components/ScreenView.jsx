
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScreenView = ({ pet, user, message , initPet}) => {

  const refreshTime = 3_600_000; // <- one hour

  const styles = {
    screen: [ // { border: '5px inset hotpink', height: '360px', margin: '5px', backgroundColor: 'lavender' }
      'border-5', // border width
      'border-pink-600', // border color
      'bg-indigo-50' // background color
    ],
    input: [
      'rounded-md', // border radius
      'border-2', // border width
    ]
  };

  const [name, setName] = useState('');
  const [ weather, setWeather ] = useState({ location: 'New Orleans', condition: 'Clear', temperature: 70 });

  const refreshWeather = () => {
    axios.get(`/weather/api`)
      .then(({ data: { location, condition, temperature }}) => {
        setWeather({ location, condition, temperature });
      })
      .catch(err => {
        console.error('Unable to get weather on client: ', err);
      });
  };

  useEffect(() => {
    refreshWeather();
    setInterval(refreshWeather, refreshTime);
  }, []);

  const handleSubmit = () => {
    if(name === '') {
      // if the user doesn't enter anything the button does nothing
      return;
    }
    axios.post('/pet', { name })
      .then(() => {
        initPet();
      })
      .catch((err) => {
        console.error(err, 'coming from screenView');
      });
  };

  const renderScreenContents = () => {
    if (pet !== null) {
      return (
        <div>
          <p>{pet.name}</p>
        </div>
      );
    } else if (user.name) {
      return (
        <div>
          <input className={ styles.input.join(' ') } type='text' value={name} onChange={(e) => setName(e.target.value)}/>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      );
    } else {
      return <p>Please sign in</p>;
    }
  };

  const chooseImage = () => {
    //TODO: choose gif variants based on weather
    const { condition } = weather;

    if (pet === null) {
      return '/noPet.png';
    } else {
      // if (/sunny|clear/.test(condition)) { return '/sunny.gif'; }
      if (/cloudy/.test(condition)) { return '/cloudy.gif'; }
      else if (/overcast|mist|fog/.test(condition)) { return '/overcast.gif'; }
      else if (/rain|drizzle/.test(condition)) { return '/rainy.gif'; }
      else if (/sleet|snow|ice|blizzard/.test(condition)) { return '/snowy.gif'; }

      return '/sunny.gif';
    }
  };

  // this is for if the user does not have a pet
  return (
    <div className={ styles.screen.join(' ') }>
      {message}
      {renderScreenContents()}
      <img src={chooseImage()} className="w-[600px] h-[300px]" style={{"imageRendering": "pixelated"}}/>
      <button onClick={ refreshWeather } >REFRESH WEATHER</button>
    </div>
  );
};

export default ScreenView;
