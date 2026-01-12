
import React, { useState } from 'react';

import Skills from './Skills';
import Statuses from './Statuses';
import Interactions from './Interactions';
import Customization from './Customization';

const DashboardView = ({ pet, user, availableSkills, behaviors, behaviorMessage, displayMessage, refreshSkillData, refreshPet, contrastTB, refreshDeviceColorData}) => {
  /**
   * A state variable determines which tab in the dashboard should be rendered. Selected by clicking the tab buttons location in the dashboard.
   * @type {string}
   * @name tab
  */
  const [ tab, setTab ] = useState('Interactions');

  const tabs = ['Interactions', 'Skills', 'Customization'];

  // original: style={{ border: '1px solid black', marginTop: '5px' }}
  const dashBoardStyles = [
    'm-top-[5px]',
    'min-h-[300px]'
  ];

  const tabStyles = [
    'border-2',
    `border-${contrastTB}`,
    'mx-[4px]',
    'mt-[10px]',
    'mb-[-2px]', // make the lines on the labels line up with the tab views
    'rounded-t-lg',
    'px-[4px]',
  ];

  const tabSelectedStyles = tabStyles.concat('border-b-device');

  /**
   * Handles the rendering logic for the dashboard tabs, and what to display if the user is not logged in or has not pet.
   * @name renderTab
   * @function
   */
  const renderTab = () => {
    if (pet) {
      switch (tab) {
        case 'Interactions':
          return <Interactions pet={ pet } refreshPet={refreshPet} displayMessage={displayMessage} contrastTB={contrastTB}/>;
        case 'Skills':
          return <Skills
            skills={pet.training}
            mood={pet.mood}
            availableSkills={availableSkills}
            behaviors={behaviors}
            behaviorMessage={behaviorMessage}
            refreshSkillData={refreshSkillData}
            contrastTB={contrastTB}
          />;
          case 'Customization':
            return <Customization contrastTB={contrastTB} refreshDeviceColorData={refreshDeviceColorData}/>;
        default:
          return null;
      }
    } else if (user.name) {
      return <p className={`border-2 border-${contrastTB} p-[10px]`}>Adopt a pet to show its data!</p>;
    } else {
      return <p className={`border-2 border-${contrastTB} p-[10px]`}>Please sign in</p>;
    }
  };

  /**
   * A simple function to decide if the pet statuses should be able to be rendered.
   * @name onlyStatus
   * @function
   */
  const onlyStatus = () => {
    if(pet) {
      return <Statuses pet={pet} />;
    }
  };

  /**
   * A simple function to set which tab to display upon clicking the corresponding button.
   * @name handleTabSelect
   * @function
   * @param {event} event - the event fired when clicking a dashboard tab button, its target value holds the name of the tab ('Interactions' or 'Skills')
   */
  const handleTabSelect = (event) => {
    setTab(event.target.name);
  };

  return (
    <div className={dashBoardStyles.join(' ')}>
      <div className="border-2 border-solid" >
        Pet Status:
        {onlyStatus()}
      </div>
      <span>
        {tabs.map((tabName) => {
          return <button
            name={tabName}
            onClick={handleTabSelect}
            key={tabName}
            // choose either the style with the black bottom border or the device-colored bottom border
            // to make the selected tab come forward
            className={(tabName === tab ? tabSelectedStyles : tabStyles).join(' ')}
          >
            {tabName}
          </button>;
        })}
      </span>
      {renderTab()}
    </div>
      // <Statuses /> or <Interactions /> or <Skills /> depending on state view
  );
};

export default DashboardView;
